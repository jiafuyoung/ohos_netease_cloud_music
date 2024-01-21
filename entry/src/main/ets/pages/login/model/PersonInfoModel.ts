import "@ohos/axios"
import axios, { formToJSON } from '@ohos/axios';
import "../../../constants/HttpConfig"
import HttpConfig from '../../../constants/HttpConfig'
import { PersonInfo } from './PersonInfo';


class PersonInfoModel {

  getPersonInfo(): Promise<PersonInfo> {
    return new Promise((resolve,reject) => {
      axios.get(
        // HttpConfig.baseUrl+"/login/cellphone?phone=phone&password=pass",
        HttpConfig.baseUrl+"/playlist/catlist",
        {
          // params: {
          //   phone: "phone", password: "pass"
          // }
        }
      ).then(res => {
        if (res.status == 200) {
          console.log("登录代理服务器成功",JSON.stringify(res.data))
          // console.log()
          console.log("为什么不打印呢")
        } else {
          console.log("登录获取信息失败",JSON.stringify(res))
        }
      }).catch(error=>{
        console.log("发生异常",JSON.stringify(error))
      })
    });
  }
}

const personInfoModel = new PersonInfoModel();
export default personInfoModel as PersonInfoModel;