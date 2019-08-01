import JSON2 from 'JSON2'

function setElementFocus(element, cursorPosition) {
  if(typeof element === 'string') {
    element = document.getElementById(element)
  }
  setTimeout(() => {
    if(typeof cursorPosition === 'number') {
      element.selectionStart = element.selectionEnd = cursorPosition
    } else {
      element.selectionStart = element.selectionEnd = element.value.length
    }
    element.focus()
  }, 0)
}

function arrToStr(arr) {
  return JSON2.stringify(JSON2.decycle(arr))
}

function strToArr(str) {
  let arr;
  try {
    arr = JSON2.parse(JSON2.retrocycle(str))
  } catch(err) {
    arr = []
  }
  return arr
}

function compareArr(newArr, oldArr) {
  const newArrStr = arrToStr(newArr)
  const oldArrStr = arrToStr(oldArr)
  return newArrStr === oldArrStr
}

export default {
  setElementFocus,
  arrToStr,
  strToArr,
  compareArr
}
