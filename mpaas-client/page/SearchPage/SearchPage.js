Page({
  data: {
    isFocus: false,
    picsData: [],
    storyData: [],
    ideaData: [],
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 4500,
    circular: true,
    duration: 3500,
    client: 'jDYgOFBiyCyHQc5eb4Y54Lin2MxfaGi4FMPyAuGXM1UsmK8sqY02AJsk'
  },

  getPhoto() {
    my.httpRequest({
      url: `https://api.pexels.com/v1/curated/?page=5&per_page=5`,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          picsData: res.data.photos
        })
        console.log(this.data.picsData)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  goDetail(e){

    const accessToken = my.getStorageSync({key: "accessToken"}).success

    if (!accessToken) {
      my.alert({
        title: 'Session Expired!',
        content: 'Please login again',
        success: () => {
          my.navigateTo({
            url: '/page/LoginPage/LoginPage',
          });
        },
      });
    }else{
      const {id, alt} = e.currentTarget.dataset

      console.log(alt, "ini dari detail")

      my.setStorageSync({key: "recentId", data: id})
      
      my.navigateTo({url :"/page/DetailPage/DetailPage?id=" + id + "&alt=" + alt})
    }

  },

  getStory(){
    my.httpRequest({
      url: `https://api.pexels.com/v1/curated/?page=10&per_page=17`,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          storyData: res.data.photos
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  getIdeas(){
    my.httpRequest({
      url: `https://api.pexels.com/v1/curated/?page=7&per_page=6`,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          ideaData: res.data.photos
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  handleSearch(value){
    my.navigateTo({url: "/page/ResultPage/ResultPage?result=" + value})
  },

  onLoad() {
    this.getPhoto()
    this.getStory()
    this.getIdeas()
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots,
    });
  },
  changeVertical() {
    this.setData({
      vertical: !this.data.vertical,
    });
  },
  changeCircular(e) {
    this.setData({
      circular: !this.data.circular,
    });
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay,
    });
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value,
    });
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value,
    });
  },

  onChange(value, e) {
    console.log(value, e);
  },
  onConfirm(value) {
    this.handleSearch(value)
  },
  onfocus(){
    this.setData({
      isFocus: true
    })
  },

  cancelTap(){
    this.setData({
      isFocus: false
    })
  },

  goWeb(e) {
    my.navigateTo({
      url: "/page/WebView/WebView?url=" + e.currentTarget.dataset.url
    })
  },
});
