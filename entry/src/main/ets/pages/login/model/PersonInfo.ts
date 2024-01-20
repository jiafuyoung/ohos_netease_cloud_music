export interface PersonInfo {
  loginType: number;
  code:      number;
  account:   Account;
  token:     string;
  profile:   Profile;
  cookie:    string;
}

export interface Account {
  id:                 number;
  userName:           string;
  type:               number;
  status:             number;
  whitelistAuthority: number;
  createTime:         number;
  salt:               string;
  tokenVersion:       number;
  ban:                number;
  baoyueVersion:      number;
  donateVersion:      number;
  vipType:            number;
  viptypeVersion:     number;
  anonimousUser:      boolean;
  uninitialized:      boolean;
}



export interface Profile {
  defaultAvatar:             boolean;
  mutual:                    boolean;
  remarkName:                null;
  avatarImgIdStr:            string;
  vipType:                   number;
  authStatus:                number;
  djStatus:                  number;
  detailDescription:         string;
  experts:                   Experts;
  expertTags:                null;
  accountStatus:             number;
  nickname:                  string;
  birthday:                  number;
  gender:                    number;
  province:                  number;
  city:                      number;
  avatarImgId:               number;
  backgroundImgId:           number;
  avatarUrl:                 string;
  followed:                  boolean;
  backgroundUrl:             string;
  userType:                  number;
  backgroundImgIdStr:        string;
  description:               string;
  userId:                    number;
  signature:                 string;
  authority:                 number;
  followeds:                 number;
  follows:                   number;
  eventCount:                number;
  avatarDetail:              null;
  playlistCount:             number;
  playlistBeSubscribedCount: number;
}

export interface Experts {
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toTopLevel(json: string): PersonInfo {
    return cast(JSON.parse(json), r("TopLevel"));
  }

  public static topLevelToJson(value: PersonInfo): string {
    return JSON.stringify(uncast(value, r("TopLevel")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                                              : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                                                                                    : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                                                                                                                          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "TopLevel": o([
    { json: "loginType", js: "loginType", typ: 0 },
    { json: "code", js: "code", typ: 0 },
    { json: "account", js: "account", typ: r("Account") },
    { json: "token", js: "token", typ: "" },
    { json: "profile", js: "profile", typ: r("Profile") },
    { json: "bindings", js: "bindings", typ: a(r("Binding")) },
    { json: "cookie", js: "cookie", typ: "" },
  ], false),
  "Account": o([
    { json: "id", js: "id", typ: 0 },
    { json: "userName", js: "userName", typ: "" },
    { json: "type", js: "type", typ: 0 },
    { json: "status", js: "status", typ: 0 },
    { json: "whitelistAuthority", js: "whitelistAuthority", typ: 0 },
    { json: "createTime", js: "createTime", typ: 0 },
    { json: "salt", js: "salt", typ: "" },
    { json: "tokenVersion", js: "tokenVersion", typ: 0 },
    { json: "ban", js: "ban", typ: 0 },
    { json: "baoyueVersion", js: "baoyueVersion", typ: 0 },
    { json: "donateVersion", js: "donateVersion", typ: 0 },
    { json: "vipType", js: "vipType", typ: 0 },
    { json: "viptypeVersion", js: "viptypeVersion", typ: 0 },
    { json: "anonimousUser", js: "anonimousUser", typ: true },
    { json: "uninitialized", js: "uninitialized", typ: true },
  ], false),
  "Binding": o([
    { json: "expiresIn", js: "expiresIn", typ: 0 },
    { json: "tokenJsonStr", js: "tokenJsonStr", typ: "" },
    { json: "bindingTime", js: "bindingTime", typ: 0 },
    { json: "refreshTime", js: "refreshTime", typ: 0 },
    { json: "url", js: "url", typ: "" },
    { json: "expired", js: "expired", typ: true },
    { json: "userId", js: "userId", typ: 0 },
    { json: "id", js: "id", typ: 0 },
    { json: "type", js: "type", typ: 0 },
  ], false),
  "Profile": o([
    { json: "defaultAvatar", js: "defaultAvatar", typ: true },
    { json: "mutual", js: "mutual", typ: true },
    { json: "remarkName", js: "remarkName", typ: null },
    { json: "avatarImgIdStr", js: "avatarImgIdStr", typ: "" },
    { json: "vipType", js: "vipType", typ: 0 },
    { json: "authStatus", js: "authStatus", typ: 0 },
    { json: "djStatus", js: "djStatus", typ: 0 },
    { json: "detailDescription", js: "detailDescription", typ: "" },
    { json: "experts", js: "experts", typ: r("Experts") },
    { json: "expertTags", js: "expertTags", typ: null },
    { json: "accountStatus", js: "accountStatus", typ: 0 },
    { json: "nickname", js: "nickname", typ: "" },
    { json: "birthday", js: "birthday", typ: 0 },
    { json: "gender", js: "gender", typ: 0 },
    { json: "province", js: "province", typ: 0 },
    { json: "city", js: "city", typ: 0 },
    { json: "avatarImgId", js: "avatarImgId", typ: 0 },
    { json: "backgroundImgId", js: "backgroundImgId", typ: 0 },
    { json: "avatarUrl", js: "avatarUrl", typ: "" },
    { json: "followed", js: "followed", typ: true },
    { json: "backgroundUrl", js: "backgroundUrl", typ: "" },
    { json: "userType", js: "userType", typ: 0 },
    { json: "backgroundImgIdStr", js: "backgroundImgIdStr", typ: "" },
    { json: "description", js: "description", typ: "" },
    { json: "userId", js: "userId", typ: 0 },
    { json: "signature", js: "signature", typ: "" },
    { json: "authority", js: "authority", typ: 0 },
    { json: "followeds", js: "followeds", typ: 0 },
    { json: "follows", js: "follows", typ: 0 },
    { json: "eventCount", js: "eventCount", typ: 0 },
    { json: "avatarDetail", js: "avatarDetail", typ: null },
    { json: "playlistCount", js: "playlistCount", typ: 0 },
    { json: "playlistBeSubscribedCount", js: "playlistBeSubscribedCount", typ: 0 },
  ], false),
  "Experts": o([
  ], false),
};