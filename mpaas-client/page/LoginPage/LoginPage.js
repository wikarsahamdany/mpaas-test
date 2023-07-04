Page({
  data: {
    email: '',
    password: ''
  },

  onLoad() {
    const accessToken = my.getStorageSync({ key: 'accessToken' }).success;

    if(accessToken){
      my.switchTab({url: "/page/HomePage/HomePage"})
    }
  },

  handleEmailInput(e) {
    this.setData({
      email: e.detail.value
    });
  },
  handlePasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },
  handleSubmit(e) {
    my.httpRequest({
      url: 'http:/localhost:3000/login',
      method: 'POST',
      data: {
        email: this.data.email,
        password: this.data.password
      },
      success: (res) => {
        my.setStorageSync({
          key: "accessToken",
          data: res.data.access_token 
        })
        my.setStorageSync({
          key: "userName",
          data: res.data.name
        })
        my.setStorageSync({
          key: "refreshToken",
          data: res.data.refresh_token
        })

        my.switchTab({url: "/page/HomePage/HomePage"})
      },
      fail: (err) => {
        my.alert({
          title: "Login Failed!",
          content: err.data.message,
        })
      },
    });
  }

});
