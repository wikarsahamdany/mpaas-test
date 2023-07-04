Page({
  data: {
    dataSearchOdd: [],
    dataSearchEven: [],
    client: 'jDYgOFBiyCyHQc5eb4Y54Lin2MxfaGi4FMPyAuGXM1UsmK8sqY02AJsk',
    pagesLimit: 15,
    queryData: "",
    lastData: 0,
    loadText: "https://media0.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif?cid=ecf05e47ggbj8cdxqcgaw3qjc0w5jqpbc78ys1ptenrohv55&ep=v1_gifs_search&rid=giphy.gif&ct=g."
  },
  onLoad(query) {
    const {result} = query

    this.setData({
      queryData: result
    })

    this.handleResult(result)
  },

  handleResult(value){

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
      url: `https://api.pexels.com/v1/search?query=${value}&per_page=${this.data.pagesLimit}`,
      method: 'GET',
      headers: {
        'Authorization': this.data.client
      },
      success: (res) => {
        const oddData = res.data.photos.filter((el) => el.id % 2 === 1);
        const evenData = res.data.photos.filter((el) => el.id % 2 === 0);

        this.setData({
          dataSearchOdd: oddData,
          dataSearchEven: evenData,
          lastData: res.data.per_page,
          loadText: true
        })
      },
      fail: (err) => {
        console.log(err, "ini fail")
      }
    })
  },
  
  onReachBottom(){

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

    this.setData({
      pagesLimit: this.data.pagesLimit + 10,
      loadText: "https://media0.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif?cid=ecf05e47ggbj8cdxqcgaw3qjc0w5jqpbc78ys1ptenrohv55&ep=v1_gifs_search&rid=giphy.gif&ct=g."
    })

    if(this.data.lastData + 10 != this.data.pagesLimit){
      this.setData({
        loadText: false
      })
    }else{
      this.handleResult(this.data.queryData)
    }
    console.log(this.data.loadText)
  }
});
