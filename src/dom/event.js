function on(eventType, child, handler, bubble = true) {
  const firstCharacter = child.slice(0, 1)
  let key = "tagName"
  if (firstCharacter === "#") {
    key = "id"
    child = child.slice(1)
  }
  if (firstCharacter === ".") {
    key = "className"
    child = child.slice(1)
  }
  this.each(node => {
    node.addEventListener(
      eventType,
      ev => {
        ev.target[key].toLowerCase().indexOf(child) !== -1 &&
          handler.call(ev.target, ev)
      },
      bubble
    )
  })
  return this
}

function off(type, handler) {
  this.each(node => node.removeEvent(type, handler))
  return this
}

function click(handler, bubble = true) {
  this.each(node => node.addEventListener("click", handler, bubble))
  return this
}

function mouseenter(handler, bubble = true) {
  this.each(node => node.addEventListener("mouseenter", handler, bubble))
  return this
}

function mouseleave(handler, bubble = true) {
  this.each(node => node.addEventListener("mouseleave", handler, bubble))
  return this
}

function mousedown(handler, bubble = true) {
  this.each(node => node.addEventListener("mousedown", handler, bubble))
  return this
}

function mousemove(handler, bubble = true) {
  this.each(node => node.addEventListener("mousemove", handler, bubble))
  return this
}

function mouseup(handler, bubble = true) {
  this.each(node => node.addEventListener("mouseup", handler, bubble))
  return this
}

function scroll(handler, bubble = true) {
  this.each(node => node.addEventListener("scroll", handler, bubble))
  return this
}

function resize(handler, bubble = true) {
  this.each(node => node.addEventListener("resize", handler, bubble))
  return this
}

function keyup(handler, bubble = true) {
  this.each(node => node.addEventListener("keyup", handler, bubble))
}

function keydown(handler, bubble = true) {
  this.each(node => node.addEventListener("keydown", handler, bubble))
}

on.key = "on"
off.key = "off"
click.key = "click"
mouseenter.key = "mouseenter"
mouseleave.key = "mouseleave"
mousedown.key = "mousedown"
mousemove.key = "mousemove"
mouseup.key = "mouseup"
scroll.key = "scroll"
resize.key = "resize"
keyup.key = 'keyup'
keydown.key = 'keydown'

export {
  on,
  off,
  click,
  mouseenter,
  mouseleave,
  mousedown,
  mousemove,
  mouseup,
  scroll,
  resize,
  keyup,
  keydown
}
