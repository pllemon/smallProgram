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
    if (app.globalData.loginInfo) {
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
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请先扫码绑定上级，再进行操作'
      })  
    }
  },
  submitForm(e) {
    let userName = e.detail.value.userName;
    let phone = e.detail.value.phone;
    if (!userName) {
      wx.showModal({
        content: '请填写姓名',
        showCancel: false
      })
      return false;
    }
    if (!phone) {
      wx.showModal({
        content: '请填写联系电话',
        showCancel: false
      })
      return false;
    }
    wx.showLoading({
      title: '提交中...',
      mask: true
    })
    app.api.commitAnswers({
      userId: app.globalData.loginInfo.member.disUserId,
      secret: app.globalData.loginInfo.secret,
      answers: this.data.answers,
      userName: userName,
      phone: phone
    }).then(res => {
      wx.hideLoading()
      if (res === 'success') {
        wx.showModal({
          content: '答卷已提交',
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
      questionId: data.nextQuestionId,
      orderIndex: data.orderIndex
    })
  },
  nextFunc() {
    this.setData({
      answers: !this.data.answers ? `${this.data.question.id}-${this.data.orderIndex}-${this.data.questionId}` : `${this.data.answers},${this.data.question.id}-${this.data.orderIndex}-${this.data.questionId}`
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