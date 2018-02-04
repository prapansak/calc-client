const file = require('fs')
const path = require('path')

const FILE_PATH = path.join(__dirname, 'file.json')
const ENCODING = 'utf8'

const axios = require('axios')
const HOST = 'http://ec2-13-229-61-204.ap-southeast-1.compute.amazonaws.com:3000'

class File {
  static setID (id) {
    this.id = id
  }

  static setCloud (value) {
    this.cloud = value
  }

  static load (callback) {
    if (this.cloud) {
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
    } else {
      return new Promise((resolve, reject) => {
        file.readFile(FILE_PATH, {encoding: ENCODING}, (err, data) => {
          if (err) {
            throw err
          } else {
            let fileData = ''
            try {
              fileData = JSON.parse(data)
            } catch (err) {}
            callback(fileData)
          }
        })
      })
    }
  }

  static save (data) {
    if (this.cloud) {
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
    } else {
      file.writeFile(FILE_PATH, data, {encoding: ENCODING}, (err, data) => {
        if (err) {
          throw err
        }
      })
    }
  }
}

module.exports = File
