function hasClass(className) {
  return this[0].classList.contains(className)
}

function addClass(className) {
  this.each(node => node.classList.add(className))
  return this
}

function removeClass(className) {
  this.each(node => node.classList.remove(className))
  return this
}

hasClass.key = "hasClass"
addClass.key = "addClass"
removeClass.key = "removeClass"

export { hasClass, addClass, removeClass }
