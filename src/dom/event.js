import { getType } from "../common"
function on(eventType, handler, propagation = true) {
  const type = getType(handler)
  if (type === "Object") {
    this.each(node => {
      node.addEventListener(
        eventType,
        e => {
          const className = e.target.className
          const targetClass = className && className.split(" ")[0]
          handler[targetClass] && handler[targetClass](node, e)
        },
        propagation
      )
    })
    return this
  }
  if (type === "Function") {
    this.each(node => {
      node.addEventListener(eventType, handler, propagation)
    })
    return this
  }
  return this
}

function off(type, handler) {
  this.each(node => node.removeEvent(type, handler))
  return this
}

export { on, off }
