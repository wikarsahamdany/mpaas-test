const app = getApp();

Page({
  data: {
    newsData: [],
    picsDataOdd: [],
    picsDataEven: [],
    pagesLimit: 15,
    pages: 1,
    client: 'jDYgOFBiyCyHQc5eb4Y54Lin2MxfaGi4FMPyAuGXM1UsmK8sqY02AJsk',
    loadText: "",
    lastData: 0,
  },

  onShow() {
    setTimeout(() => {
      my.removeStorageSync({
        key: "accessToken"
      })
    }, 180000)
  },

  getPhoto() {

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
    }

      my.httpRequest({
        url: `https://api.pexels.com/v1/curated/?page=1&per_page=${this.data.pagesLimit}`,
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
      url: `https://api.pexels.com/v1/curated/?page=2&per_page=${this.data.pagesLimit}`,
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

  onLoad() {
    this.getPhoto();
    this.getPhoto2();
    },

  onReachBottom() {
    this.setData({
      pagesLimit: this.data.pagesLimit + 10,
      loadText: "Load..."
    });

    if (this.data.pagesLimit > 80) {
      this.setData({
        loadText: ""
      });
    }

    this.getPhoto();
    this.getPhoto2();
  },

  onPullDownRefresh() {
    this.setData({
      pagesLimit: 10,
      loadText: "Load...",
    });

    this.getPhoto();
  }
});
