const app = getApp()
Page({
  data: {
    userInfo: {},
  },

  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})