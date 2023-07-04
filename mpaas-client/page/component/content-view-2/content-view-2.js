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
        const {id} = e.currentTarget.dataset
        console.log("masokkk 2")
        
        
        my.navigateTo({url :"/page/DetailPage/DetailPage?id=" + id})
      }
    },
  },
});
