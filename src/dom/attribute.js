import { getType } from "../common"

export function attr(...params) {
  const param1 = params[0]
  const param2 = params[1]
  const type = getType(param1)
  if (param2) {
    this.each(node => node.setAttribute(param1, param2))
    return this
  }
  if (type === "String") {
    return this[0].getAttribute(param1)
  }
  if (type === "Array") {
    const node = this[0]
    return param1.map(v => node.getAttribute(v))
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

export function prop(...params) {
  const param1 = params[0]
  const param2 = params[1]
  if (param2) {
    this.each(node => (node[param1] = param2))
    return this
  }
  return this[0][param1]
}

export function val(value) {
  if (value !== undefined) {
    this.each(node => {
      node.value = value
    })
    return this
  }
  return this[0].value
}

export function html(value) {
  if (value !== undefined) {
    this.each(node => {
      node.innerHTML = value
    })
    return this
  }
  return this[0].innerHTML
}

export function text(value) {
  if (value !== undefined) {
    this.each(node => {
      node.innerText = value
    })
    return this
  }
  return this[0].innerText
}
