Page({
  data: {
    detailPhoto: {},
    client: 'jDYgOFBiyCyHQc5eb4Y54Lin2MxfaGi4FMPyAuGXM1UsmK8sqY02AJsk',
    isLoading: true,
    picsDataOdd: [],
    picsDataEven: [],
    pagesLimit: 15,
    altData: "",
    idData: "",
    loadText: "",
  },

  onLoad(options) {

    if (this.data.isLoading) {
      my.showLoading()
    }

    my.setNavigationBar({
      backgroundColor: "#F9F5F6"
    })

    
    let {
      id,
      alt
    } = options
    
    
    if (!alt || alt == "undefined") {
      alt = "random"
    }
    

    this.setData({
      altData: alt,
      idData: id
    })

    my.setStorageSync({
      key: "recentId",
      data: "wew"
    })

    this.getDetail()
    this.getPhoto(alt)
    this.getPhoto2(alt)
  },
  onPullDownRefresh() {

    const accessToken = my.getStorageSync({
      key: "accessToken"
    }).success

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
    }

    my.httpRequest({
      url: 'https://api.pexels.com/v1/photos/' + my.getStorageSync({
        key: "recentId"
      }).data,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          detailPhoto: res.data
        })
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        my.stopPullDownRefresh()
      }
    });
  },

  getDetail(){
    my.httpRequest({
      url: 'https://api.pexels.com/v1/photos/' + this.data.idData,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          detailPhoto: res.data
        })
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        this.setData({
          isLoading: false
        })
        my.hideLoading()
      }
    });
  },

  goWeb() {
    my.navigateTo({
      url: "/page/WebView/WebView?url=" + this.data.detailPhoto.photographer_url
    })
  },

  getPhoto() {

    const accessToken = my.getStorageSync({
      key: "accessToken"
    }).success

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
    }


    my.httpRequest({
      url: `https://api.pexels.com/v1/search?query=${this.data.altData}&per_page=${this.data.pagesLimit}`,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          picsDataOdd: res.data.photos,
          lastData: res.data.per_page,
          loadText: ""
        });
        my.stopPullDownRefresh();
      },
      fail: (err) => {
        console.log(err);
        my.stopPullDownRefresh();
      }
    });
  },

  getPhoto2() {
    my.httpRequest({
      url: `https://api.pexels.com/v1/search?query=${this.data.altData}&page=2&per_page=${this.data.pagesLimit}`,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        this.setData({
          picsDataEven: res.data.photos,
          loadText: ""
        });
        my.stopPullDownRefresh();
      },
      fail: (err) => {
        console.log(err);
        my.stopPullDownRefresh();
      }
    });
  },

  onReachBottom() {
    this.setData({
      pagesLimit: this.data.pagesLimit + 15,
      loadText: "Load..."
    })

    if (this.data.pagesLimit > 80) {
      this.setData({
        loadText: ""
      });
    }

    this.getPhoto(this.data.altData)
    this.getPhoto2(this.data.altData)
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
  
        my.setStorageSync({key: "recentId", data: id})
        
        my.navigateTo({url :"/page/DetailPage/DetailPage?id=" + id + "&alt=" + alt})
      }

    }

});