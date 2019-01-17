import { getType } from "../common"

function attr(...params) {
  const param1 = params[0]
  const param2 = params[1]
  const type = getType(param1)
  if (param2) {
    this.each(node => node.setAttribute(param1, param2))
    return this
  }
  if (type === "String") {
    return this[0].getAttribute(param)
  }
  if (type === "Array") {
    const arr = []
    for (let i = 0, len = param1.length; i < len; i++) {
      arr.push(this[0].getAttribute(param1[i]))
    }
    return arr
  }
  this.each(node => {
    for (const key in param1) {
      if (param1.hasOwnProperty(key)) {
        node.setAttribute(key, param1[key])
      }
    }
  })
  return this
}

function prop(...params) {
  const param1 = params[0]
  const param2 = params[1]
  if (param2) {
    this.each(node => (node[param1] = param2))
    return this
  }
  return this[0][param1]
}

function val(value) {
  if (value !== undefined) {
    this.each(node => {
      node.value = value
    })
    return this
  }
  return this[0].value
}

function html(value) {
  if (value !== undefined) {
    this.each(node => {
      node.innerHTML = value
    })
    return this
  }
  return this[0].innerHTML
}

function text(value) {
  if (value !== undefined) {
    this.each(node => {
      node.innerText = value
    })
    return this
  }
  return this[0].innerText
}

attr.key = "attr"
prop.key = "prop"
val.key = "val"
html.key = "html"
text.key = "text"

export { attr, prop, val, html, text }
