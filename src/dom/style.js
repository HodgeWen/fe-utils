import { getType } from "../common"

function css(...params) {
  const param1 = params[0]
  const param2 = params[1]
  if (param2 !== undefined) {
    this.each(node => (node.style[param1] = param2))
    return this
  }
  if (getType(param1) === "String") {
    return window.getComputedStyle(this[0])[param1]
  }
  this.each(node => {
    for (const key in param1) {
      if (param1.hasOwnProperty(key)) {
        node.style[key] = param1[key]
      }
    }
  })
  return this
}

css.key = "css"

export { css }
