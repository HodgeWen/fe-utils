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

function createEvent (eventName) {
  function ret (handler, bubble = true) {
    this.each(node => node.addEventListener(eventName, handler, bubble))
    return this
  }
  ret.key = eventName
  return ret
}


const click = createEvent('click')

const mouseenter = createEvent('mouseenter')

const mouseleave = createEvent('mouseleave')

const mousedown = createEvent('mousedown')

const mousemove = createEvent('mousemove')

const mouseup = createEvent('mouseup')

const scroll = createEvent('scroll')

const resize = createEvent('resize')

const keyup = createEvent('keyup')

const keydown = createEvent('keydown')

const change = createEvent('change')

on.key = "on"
off.key = "off"

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
  keydown,
  change
}
