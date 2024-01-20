import http from '@ohos.net.http';
import HashMap from '@ohos.util.HashMap';
import {Axios} from  "@ohos/axios"

export default  class ApiUtil {
  private request: http.HttpRequest;
  private head: Object;
  private url: string;
  private method: http.RequestMethod;
  private extraData:HashMap<string,string>;



  public setData(k:string,v:string):void{
    this.extraData.set(k,v);
  }

  setAllData(params:{}):void{
    for (let paramsKey in params) {
      this.extraData.set(paramsKey,params[paramsKey])
    }
  }

  getHttpInstance(): http.HttpRequest {
    if (!this.request) {
      return http.createHttp();
    }
  }
}