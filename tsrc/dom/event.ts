export function on(eventType, child, handler, bubble = false) {
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

export function off(type, handler) {
  this.each(node => node.removeEvent(type, handler))
  return this
}

export function createEvent (eventName) {
  function ret (handler, bubble = false) {
    this.each(node => node.addEventListener(eventName, handler, bubble))
    return this
  }
  ret.key = eventName
  return ret
}

export const click = createEvent('click')

export const mouseenter = createEvent('mouseenter')

export const mouseleave = createEvent('mouseleave')

export const mousedown = createEvent('mousedown')

export const mousemove = createEvent('mousemove')

export const mouseup = createEvent('mouseup')

export const scroll = createEvent('scroll')

export const resize = createEvent('resize')

export const keyup = createEvent('keyup')

export const keydown = createEvent('keydown')

export const change = createEvent('change')
