Page({
  data: {
    urlData: ""
  },
  onLoad(query) {
    const {url} = query

    this.setData({
      urlData: url
    })
  },
});
