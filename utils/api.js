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
  // 登陆
  wxappLogin(data) {
    return this.request('http://dist.qtsay.com/api/v1/wxappLogin', data, 'GET')
  }
  // 获取二维码
  getScan(code) {
    return this.request('http://dist.qtsay.com/api/v1/createQrcode', {
      code
    }, 'GET', 2)
  }

  // 获取记录
  getProfitRecordList(disUserId) {
    return this.request('http://dist.qtsay.com/api/v1/getProfitRecordList', {
      disUserId
    }, 'GET')
  }

  request(url, data, method = 'GET', type = 1) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        success(res) {
          if (type == 2) {
            resolve(res.data)
          } else {
            resolve(res.data.data)
          }
        },
        fail() {
          reject()
        }
      })
    })
  }
}

export default new Api