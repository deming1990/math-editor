export default {
  setElementFocus(element) {
    if(typeof element === 'string') {
      if(element.slice(0,1) !== '#') {
        element = `#${element}`
      }
      element = document.querySelector(element)
    }
    element.focus()
  }
}
