export default {
  setElementFocus(element, cursorPosition) {
    if(typeof element === 'string') {
      element = document.getElementById(element)
    }
    element.focus()
    if(typeof cursorPosition === 'number') {
      element.setSelectionRange(cursorPosition, cursorPosition)
    }
  }
}
