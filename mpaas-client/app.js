App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);
    my.on('nativeToTiny', (res) => {
      my.showToast({
        type: 'none',
        content: JSON.stringify(res),
        duration: 3000,
        success: () => {
          
        },
        fail: () => {
          
        },
        complete: () => {
          
        }
      });
    })
  },

  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
    btnSubmitColor: "#213555" ,
    checkToken : function checkAccessToken() {
      const accessToken = my.getStorageSync({ key: 'accessToken' }).success;
      return !!accessToken;
    }
  },
  
});
