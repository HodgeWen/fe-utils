function hasClass(className) {
  return this[0].contains(className)
}

function addClass(className) {
  this.each(node => node.classList.add(className))
  return this
}

function removeClass(className) {
  this.each(node => node.classList.remove(className))
  return this
}

hasClass.name = "hasClass"
addClass.name = "addClass"
removeClass.name = "removeClass"

export { hasClass, addClass, removeClass }
