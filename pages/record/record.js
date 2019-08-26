// pages/subordinate/subordinate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lsit: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.loginInfo) {
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      app.api.getProfitRecordList(app.globalData.loginInfo.member.disUserId).then(res => {
        wx.hideLoading()
        this.setData({
          list: res.profitRecordList
        })
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请先扫码绑定上级，再进行操作'
      })  
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})