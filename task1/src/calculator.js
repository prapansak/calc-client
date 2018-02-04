const BigNumber = require('bignumber.js')

class Calculator {
  static plus (a, b) {
    const x = new BigNumber(a)
    const y = new BigNumber(b)
    return x.plus(y)
  }

  static minus (a, b) {
    const x = new BigNumber(a)
    const y = new BigNumber(b)
    return x.minus(y)
  }

  static multiply (a, b) {
    const x = new BigNumber(a)
    const y = new BigNumber(b)
    return x.multipliedBy(y)
  }

  static divide (a, b) {
    const x = new BigNumber(a)
    const y = new BigNumber(b)
    return x.dividedBy(y)
  }

  static pow (a, b) {
    return new BigNumber(parseFloat(a)).pow(parseFloat(b))
  }

  static toFormat (value) {
    const x = new BigNumber(value)
    return x.toFormat()
  }
}

module.exports = Calculator
