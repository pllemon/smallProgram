const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    ewmPopup: false
  },

  onLoad: function () {
    this.loadMethods();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  loadMethods: function () {
    wx.showLoading({
      title: '加载中...',
    })
    wx.login({
      success(res) {
        app.api.wxappLogin(res.code).then(res => {
          console.log(res)
          wx.hideLoading()
        })
      },
      fail(err) {
        reject(err)
      }
    })
  },

  scanCode: function () {
    wx.scanCode({
      success (res) {
        console.log(res)
        loadMethods();
      }
    })
  },

  showEwm: function () {
    this.setData({
      ewmPopup: true
    })
  },
  hideEwm: function () {
    this.setData({
      ewmPopup: false
    })
  }
})