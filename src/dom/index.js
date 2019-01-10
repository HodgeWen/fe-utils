import {
  each,
  getType
} from './proto'

function Selector(str) {
  this.length = 0
  if (str) {
    this.selector = str
  }
  let nodeList = document.querySelectorAll(str)
  this.push(...nodeList)
}

const pt = Selector.prototype = Object.create(null)

const ap = Array.prototype

pt.constructor = Selector
pt.push = ap.push
pt.slice = ap.slice
pt.splice = ap.splice
pt.each = each

function $(str) {
  return new Selector(str)
}

$.use = function (...funcs) {
  for (let i = 0, len = funcs.length; i < len; i++) {
    pt[funcs[i].name] = funcs[i]
  }
}

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

function css(...params) {
  const param1 = params[0]
  const param2 = params[1]
  if (param2) {
    this.each(node => node.style[param1] = param2)
    return this
  }
  if (getType(param1) === 'String') {
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

function attr(param) {
  const param1 = params[0]
  const param2 = params[1]
  const type = getType(param1)
  if (param2) {
    this.each(node => node.setAttribute(param1, param2))
    return this
  }
  if (type === 'String') {
    return this[0].getAttribute(param)
  }
  if (type === 'Array') {
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
    this.each(node => node[param1] = param2)
    return this
  }
  return this[0][param1]
}

function append(child, deep = true) {
  this.each(node => {
    node.appendChild(child.cloneNode(deep))
  })
  return this
}

function on(eventType, handler, propagation = true) {
  const type = getType(handler)
  if (type === 'Object') {
    this.each(node => {
      node.addEventListener(eventType, e => {
        const className = e.target.className
        const targetClass = className && className.split(' ')[0]
        handler[targetClass] && handler[targetClass](node, e)
      }, propagation)
    })
    return this
  }
  if (type === 'Function') {
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

function setNode() {

}

function find(qs) {
  return this[0].querySelectorAll(qs)
}

function eq(index) {
  const target = this[index]
  this.splice(0)
  this.push(target)
  return this
}

export {
  $,
  hasClass,
  addClass,
  removeClass,
  attr,
  on,
  off,
  find,
  append,
  css,
  prop,
  setNode,
  eq
}