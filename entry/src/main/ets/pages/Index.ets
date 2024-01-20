//引入其它页面组件
import "../pages/login/loginPage"
import { LoginPage } from '../pages/login/loginPage'
//Component标记自定义组件
//@Entry标记当前组件是入口组件
//@state标记该变量是状态变量，值变化时会触发ui 更新
@Entry
@Component
struct Index {
  @State message: string = 'Hell World'

  build() {
    Row() {
      // Column() {
      //   Text(this.message)
      //     .fontSize(50)
      //     .fontWeight(FontWeight.Bold).onClick(()=>{this.message="测试 onclick"})
      //   Row(){
      //   }
      // }
      // .width('100%')
      LoginPage()
    }
    .height('100%')
  }
}