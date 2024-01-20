import "../pages/tap/followPage"
import "../pages/tap/findPage"
import "../components/TopButtonComponent"
import { FindPage } from './tap/findPage'
import { FollowPage } from './tap/followPage'
import { TopButton } from '../components/TopButtonComponent'
@Entry
@Component
struct Main {
  @State message: string = 'Hello World'

  private tabController:TabsController = new TabsController()
  @State currentIndex:number = 0;

  @Builder TabBuilder(title: string, targetIndex: number) {
    Column() {
      Text(title)
        .fontColor(this.currentIndex === targetIndex ? '#1698CE' : '#6B6B6B')
    }
    .onClick(() => {
      this.currentIndex = targetIndex;
      this.tabController.changeIndex(this.currentIndex);
    })
  }

  build() {
    Column() {
      //{showBack:false}给自定义组件TopButton传值
      TopButton({showBack:false,showRefresh:false}).height("10%")
      Row() {
        //barPosition:BarPosition.End定义了 tab 在上面还是下面
        Tabs({barPosition:BarPosition.End,controller:this.tabController}) {
          TabContent(){Column(){
            FindPage()
          }}.tabBar(this.TabBuilder("发现",0))
          TabContent(){Column(){
            Text("我的")
          }}.tabBar(this.TabBuilder("我的",1))
          TabContent(){FollowPage()}.tabBar(this.TabBuilder("关注",2))
        }
      }.height("90%")
    }
    .width('100%')
  }
}