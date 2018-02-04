const axios = require('axios')
const HOST = 'http://localhost:3000'

class File {
  static setID (id) {
    this.id = id
  }

  static load (callback) {
    const config = {
      method: 'post',
      url: HOST + '/load',
      data: {
        id: this.id
      }
    }
    axios(config).then(d => {
      callback(d.data.data)
    })
  }

  static save (data) {
    const config = {
      method: 'post',
      url: HOST + '/save',
      data: {
        id: this.id,
        inputA: data.inputA,
        inputB: data.inputB,
        operator: data.operator,
        result: data.result
      }
    }
    return axios(config)
  }
}

module.exports = File
