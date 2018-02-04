const file = require('fs')
const path = require('path')

const FILE_PATH = path.join(__dirname, 'file.json')
const ENCODING = 'utf8'

class File {
  static load (callback) {
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
  }

  static save (data) {
    file.writeFile(FILE_PATH, data, {encoding: ENCODING}, (err, data) => {
      if (err) {
        throw err
      }
    })
  }
}

module.exports = File
