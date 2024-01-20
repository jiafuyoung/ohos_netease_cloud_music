import router from '@ohos.router';
import "./model/PersonInfoModel"
import PersonInfoModel from './model/PersonInfoModel';

//export给其它组件使用
@Entry
@Component
export struct LoginPage {

  @State phone : String = ""
  @State password : String =""

  build() {
    Column() {
      LoginImage()
      Row().height(20)
      LoginForm()
      Row().height(20)
      Row(){
        Button("LOGIN").onClick(()=>{
          onClickLogin()
        })
      }.height(50)
    }
  }
}

function onClickLogin() {
  PersonInfoModel.getPersonInfo().then(p=>{
    router.pushUrl({url:"pages/main"},router.RouterMode.Single,//最前面不能加斜杠
      (err) => {
        if (err) {
          console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
          return;
        }
        console.info('Invoke pushUrl succeeded.')
      });
  }).catch()

}

@Component
struct LoginImage{
  build(){
    Column() {
      Row().height(40)
      Text("登录").fontColor(Color.Grey).fontSize(22).height(50).margin(20)
      Row() {
        // Image($rawfile("assets/icons/login.svg")).width("100%")
        Image($r("app.media.login_music_logo")).width("100%")
          .interpolation(ImageInterpolation.High)
      }.margin(40)
    }.width("100%")
  }
}

@Component
struct LoginForm{

  build(){
    Column(){
      Row(){
        Image($r("app.media.user")).width(35).height(35)
        TextInput({placeholder:"手机号"}).type(InputType.Number).width("80%")
      }.height(50)
      Row().height(15)
      Row(){
        Row(){
          Image($r("app.media.pass")).width(40).height(40)
          TextInput({placeholder:"密码"}).type(InputType.Password).width("80%")
        }.height(50).justifyContent(FlexAlign.SpaceBetween)
      }
    }.width("100%")
  }
}

