const _ = require('lodash')
const BigNumber = require('bignumber.js')
const {dialog} = require('electron').remote

const USER_ID = parseInt(Math.random(10) * 9000)
const Calculator = require('./calculator')
const File = require('./file')

File.setID(_.toString(USER_ID))
let data = null

document.getElementById('btn-plus').addEventListener('click', function () {
  const input = getInput()
  if (!_.isEmpty(input.a) && !_.isEmpty(input.b)) {
    if (!_.isNaN(input.a) && !_.isNaN(input.b)) {
      const result = Calculator.plus(input.a, input.b)
      setButtonActive('btn-plus')
      showResult(result)
      setPreviousData(input.a, input.b, 'plus', result)
    }
  } else {
    showWarningMessage('Input field is empty.')
  }
})

document.getElementById('btn-minus').addEventListener('click', function () {
  const input = getInput()
  if (!_.isEmpty(input.a) && !_.isEmpty(input.b)) {
    if (!_.isNaN(input.a) && !_.isNaN(input.b)) {
      const result = Calculator.minus(input.a, input.b)
      setButtonActive('btn-minus')
      showResult(result)
      setPreviousData(input.a, input.b, 'minus', result)
    }
  } else {
    showWarningMessage('Input field is empty.')
  }
})

document.getElementById('btn-multiply').addEventListener('click', function () {
  const input = getInput()
  if (!_.isEmpty(input.a) && !_.isEmpty(input.b)) {
    if (!_.isNaN(input.a) && !_.isNaN(input.b)) {
      const result = Calculator.multiply(input.a, input.b)
      setButtonActive('btn-multiply')
      showResult(result)
      setPreviousData(input.a, input.b, 'multiply', result)
    }
  } else {
    showWarningMessage('Input field is empty.')
  }
})

document.getElementById('btn-divide').addEventListener('click', function () {
  const input = getInput()
  if (!_.isEmpty(input.a) && !_.isEmpty(input.b)) {
    if (!_.isNaN(input.a) && !_.isNaN(input.b)) {
      const result = Calculator.divide(input.a, input.b)
      setButtonActive('btn-divide')
      showResult(result)
      setPreviousData(input.a, input.b, 'divide', result)
    }
  } else {
    showWarningMessage('Input field is empty.')
  }
})

document.getElementById('btn-pow').addEventListener('click', function () {
  const input = getInput()
  if (!_.isEmpty(input.a) && !_.isEmpty(input.b)) {
    if (!_.isNaN(input.a) && !_.isNaN(input.b)) {
      const result = Calculator.pow(input.a, input.b)
      setButtonActive('btn-pow')
      showResult(result)
      setPreviousData(input.a, input.b, 'pow', result)
    }
  } else {
    showWarningMessage('Input field is empty.')
  }
})

document.getElementById('btn-save').addEventListener('click', function () {
  const input = getInput()
  if (!_.isEmpty(input.a) && !_.isEmpty(input.b) && !_.isEmpty(data)) {
    File.save(JSON.stringify(data))
    document.getElementById('input-a').value = ''
    document.getElementById('input-b').value = ''
    document.getElementById('result').value = ''
    setButtonActive(null)
  } else {
    dialog.showErrorBox('Can\'t save data', 'Input filed is empty.')
  }
})

document.getElementById('btn-load').addEventListener('click', function () {
  let previousData = data
  File.load((d) => {
    if (d) {
      document.getElementById('input-a').value = d.inputA
      document.getElementById('input-b').value = d.inputB
      if (d.operator !== 'pow') showResult(d.result); else showResult(d.result)

      switch (d.operator) {
        case 'plus': setButtonActive('btn-plus'); break
        case 'minus': setButtonActive('btn-minus'); break
        case 'multiply': setButtonActive('btn-multiply'); break
        case 'divide': setButtonActive('btn-divide'); break
        case 'pow': setButtonActive('btn-pow'); break
        default: setButtonActive(null); showResult('')
      }

      if (_.isEmpty(previousData)) {
        setPreviousData(d.inputA, d.inputB, d.operator, d.result)
      }
    } else {
      showWarningMessage('Empty data.')
    }
  })
})

document.getElementById('checkbox').addEventListener('change', function (event) {
  File.setCloud(event.target.checked)
})

function getInput () {
  const a = document.getElementById('input-a').value
  const b = document.getElementById('input-b').value
  return {a, b}
}

function showResult (value, isBigNumber = true) {
  document.getElementById('result').value = new BigNumber(value).toFormat()
}

function setButtonActive (elementId) {
  const btnId = ['btn-plus', 'btn-minus', 'btn-multiply', 'btn-divide', 'btn-pow']
  for (let i = 0; i < btnId.length; i++) {
    document.getElementById(btnId[i]).setAttribute('class', 'btn btn-large btn-default')
  }

  if (!_.isEmpty(elementId)) {
    document.getElementById(elementId).setAttribute('class', 'btn active btn-large btn-default')
  }
}

function showWarningMessage (msg) {
  dialog.showMessageBox({
    type: 'warning',
    title: 'Warning',
    message: msg
  })
}

function setPreviousData (inputA, inputB, operator, result) {
  data = {
    inputA,
    inputB,
    operator,
    result
  }
}
