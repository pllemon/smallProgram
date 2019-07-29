class Api {
  // 问卷列表
  getQuestion() {
    return this.request('http://dist.qtsay.com/api/v1/getAllQuestion', {}, 'POST')
  }
  // 提交问卷答案
  commitAnswers(data) {
    return this.request('http://dist.qtsay.com/api/v1/commitAnswers', data, 'GET')
  }
  // 下级
  subordinate(data) {
    return this.request('http://dist.qtsay.com/api/v1/subordinate', data, 'POST')
  }
  wxappLogin(code) {
    return this.request('http://dist.qtsay.com/wxappLogin', {
      code
    }, 'GET')
  }
  request(url, data, method = 'GET') {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        success(res) {
          resolve(res.data.data)
        },
        fail() {
          reject()
        }
      })
    })
  }
}

export default new Api