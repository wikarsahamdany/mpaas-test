Page({
  data: {
    logo: "https://i.ibb.co/3mdYyLF/logo-mini-program.jpg"
  },
  onLoad() {
    setTimeout(() => {
      if(my.getStorageSync({key: "tosAccept"}).success){
        my.reLaunch({url: "/page/LoginPage/LoginPage"})
      }else{
        my.reLaunch({url: "/page/TosPage/TosPage"})
      }
    } ,2500)
  }
});
