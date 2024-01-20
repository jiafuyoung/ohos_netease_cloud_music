@Component
export struct TopButton {
  @State title: string = "标题"
  @State showBack: boolean = true;
  @State showRefresh: boolean = true;
  @State showTitle: boolean = true;

  build() {
    Row() {
      //通过三个状态值控制是否展示标题，返回和刷新按钮，用 row 包裹防止隐藏时按钮位置变化
      Row() {
        Row(){
          if (this.showBack)
            Image($rawfile("assets/icons/button/back.png")).width(40).height(40).padding(5)
        }
        Row(){
          if (this.showTitle)
            Text(this.title).fontSize(22)
        }
        Row(){
          if (this.showRefresh)
            Image($rawfile("assets/icons/button/refresh.png")).width(40).height(40).padding(3)
        }
      }.height(40).width("100%").justifyContent(FlexAlign.SpaceBetween)
    }
  }
}