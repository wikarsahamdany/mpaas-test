Component({
  mixins: [],
  data: {},
  props: {
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
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
  },
});
