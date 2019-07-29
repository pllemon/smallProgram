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
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    app.api.subordinate({
      memberId: 'dist',
      secret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjU5NjE0MjYzOTIsInBheWxvYWQiOiJcImRpc3RcIiJ9.NPNeVpoHi4MnW2pRv65QTyytApYokVHVZpdkPYAB2H4'
    }).then(res => {
      wx.hideLoading()
      this.setData({
        list: res
      })
    })
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