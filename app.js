//app.js
import api from './utils/api'
App({
  onLaunch: function () {
    // 登陆获取用户信息
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.login({
      success(res) {
        that.api.wxappLogin({
          code: res.code
        }).then(res => {
          console.log(res)
          if (res == '') {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '请先扫码绑定上级，再进行操作'
            })   
          }
          that.globalData.loginInfo = res;
          wx.hideLoading()
        })
      },
      fail(err) {
        reject(err)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  loadMethods: function () {
    
  },

  globalData: {
    userInfo: null,
    loginInfo: null
  },
  api
})