@Component
@Entry
struct demo{

  build(){
    Column(){
      Row(){
        //网络图片
        // Image("")
        //加载本地图片
        // Image($r())
        // Image($rawfile("assets/images/"))
        Image('https://open-image.ws.126.net/image/snapshot_movie/2018/1/2/a/497e17ff97f141f2b82ca8b97fad402a.jpg')
        // Image('https://p2.music.126.net/4131R-VbfOuTeiI-9jiwAw==/18619129906889994.jpg')
          .width("300")
          .height("300")
      }.backgroundColor(Color.Red).width("100%").height("100%").justifyContent(FlexAlign.End)
    }
  }
}