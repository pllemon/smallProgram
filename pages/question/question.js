// pages/question/question.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    questionId: null,
    question: null,
    questionEnd: false,
    answers: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    app.api.getQuestion().then(res => {
      console.log(res)
      this.setData({
        questionList: res.questionList,
        questionId: res.questionList[0].id,
        question: res.questionList[0]
      })
      wx.hideLoading()
    })
  },
  submitForm(e) {
    wx.showLoading({
      title: '提交中...',
      mask: true
    })
    app.api.commitAnswers({
      userId: 'dist',
      secret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjU5NjE0MjYzOTIsInBheWxvYWQiOiJcImRpc3RcIiJ9.NPNeVpoHi4MnW2pRv65QTyytApYokVHVZpdkPYAB2H4',
      answers: this.data.answers,
      userName: e.detail.value.userName,
      phone: e.detail.value.phone
    }).then(res => {
      wx.hideLoading()
      if (res === 'success') {
        wx.showModal({
          title: '提示',
          content: '答卷已提交。',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../my/my'
              })
            }
          }
        })

      }
    })
  },
  radioChange: function(e) {
    let data = this.data.question.questionOptionList.filter(item => {
      return item.id == e.detail.value
    })[0]
    this.setData({
      questionId: data.nextQuestionId
    })
  },
  nextFunc() {
    this.setData({
      answers: !this.data.answers ? `${this.data.question.id}-${this.data.questionId}` : `${this.data.answers},${this.data.question.id}-${this.data.questionId}`
    })
    console.log(this.data.answers)
    if (!this.data.questionId) {
      this.setData({
        questionEnd: true
      })
      return
    }
    this.setData({
      question: null
    })
    this.setData({
      question: this.data.questionList.filter(item => {
        return item.id == this.data.questionId
      })[0]
    })
  }
})