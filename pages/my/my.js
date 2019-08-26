const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    ewmPopup: false,
    codeUrl: ''
  },

  onLoad: function () {
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

  

  scanCode: function () {
    let that = this;
    if (app.globalData.loginInfo) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '你已绑定上级，请勿重新绑定'
      })      
    } else {
      wx.scanCode({
        success (res) {
          console.log(res.result)
          res.result = decodeURIComponent(res.result);
          let disPlatformId = res.result.split('&')[1].slice(14);
          let disModelId = res.result.split('&')[0].slice(11);
          console.log(res.result)
          console.log(disPlatformId);
          console.log(disModelId);
          wx.showLoading({
            title: '加载中...',
          })
          wx.login({
            success(res) {
              app.api.wxappLogin({
                code: res.code,
                disModelId: disModelId,
                disPlatformId: disPlatformId
              }).then(res => {
                console.log(res)
                app.globalData.loginInfo = res;
                wx.hideLoading()
                wx.showToast({
                  title: '绑定成功',
                  icon: 'success',
                  duration: 2000
                })                
              })
            }
          })
        }
      })
    }
  },

  showEwm: function () {
    let loginInfo = app.globalData.loginInfo;
    let codeStr = encodeURIComponent('disModelId:' + loginInfo.member.disUserId + '&disPlatformId:' + loginInfo.member.disPlatformId);
    console.log(codeStr);
    app.api.getScan(codeStr).then(res => {
      console.log(res)
      this.setData({
        codeUrl: res,
        ewmPopup: true
      })
    })
  },
  hideEwm: function () {
    this.setData({
      ewmPopup: false
    })
  }
})