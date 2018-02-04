const axios = require('axios')
const HOST = 'http://localhost:3000'

class Calculator {
  static plus (a, b) {
    const config = {
      method: 'post',
      url: HOST + '/plus',
      data: {
        inputA: a,
        inputB: b
      }
    }
    return axios(config)
  }

  static minus (a, b) {
    const config = {
      method: 'post',
      url: HOST + '/minus',
      data: {
        inputA: a,
        inputB: b
      }
    }
    return axios(config)
  }

  static multiply (a, b) {
    const config = {
      method: 'post',
      url: HOST + '/multiply',
      data: {
        inputA: a,
        inputB: b
      }
    }
    return axios(config)
  }

  static divide (a, b) {
    const config = {
      method: 'post',
      url: HOST + '/divide',
      data: {
        inputA: a,
        inputB: b
      }
    }
    return axios(config)
  }

  static pow (a, b) {
    const config = {
      method: 'post',
      url: HOST + '/pow',
      data: {
        inputA: a,
        inputB: b
      }
    }
    return axios(config)
  }
}

module.exports = Calculator
