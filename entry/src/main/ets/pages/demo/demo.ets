@Component
struct demo{

  build(){
    Column(){
      Row(){
        //网络图片
        Image("")
        //加载本地图片
        // Image($r())
        Image($rawfile("assets/images/"))
      }
    }
  }
}