import {parse, stringify} from 'flatted'

function setElementFocus(element, cursorPosition) {
  if(typeof element === 'string') {
    element = document.getElementById(element)
  }
  setTimeout(() => {
    if(!element) return
    if(typeof cursorPosition === 'number') {
      element.selectionStart = element.selectionEnd = cursorPosition
    } else {
      element.selectionStart = element.selectionEnd = element.value.length
    }
    element.focus()
  }, 0)
}

function arrToStr(arr) {
  return stringify(arr)
}

function strToArr(str) {
  let arr;
  try {
    arr = parse(str)
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
