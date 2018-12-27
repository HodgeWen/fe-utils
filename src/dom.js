import { wt } from './utils'
function Selector(str) {
  this.length = 0
  this.selector = str
  const nodeList = document.querySelectorAll(str)
  this.push(...nodeList)
}

const pt = Selector.prototype = Object.create(null)
const ap = Array.prototype

pt.constructor = Selector
pt.push = ap.push
pt.slice = ap.slice
pt.splice = ap.splice

function $(str) {
  return new Selector(str)
}

$.use = function (...funcs) {
  wt(funcs).each(fn => pt[fn.name] = fn)
}

function hasClass(...classNames) {
  return wt(classNames).each(
    className => this[0].className.split(' ').indexOf(className) !== -1
  )
}

function addClass(className) {
  if (this.hasClass(className)) {
    return this
  }
  wt(this).each(node => {
    node.classList ? 
    node.classList.add(className) :
    node.className += ` ${className}`
  })  
  return this
}

function removeClass(className) {
  if (this.hasClass(className)) {
    return this
  }
  wt(this).each(node => {
    node.classList ? 
    node.classList.remove(className) :
    node.className.replace(new RegExp('\\s?' + className), '')
  })  
  return this
}

function css(param) {
  const type = wt(param).type
  if (type === 'Object') {
    wt(this).each(node => {
      wt(param).each((item, key) => {
        node.style[key] = item
      })
    })
    return this
  }
  if (type === 'String') {
    return window.getComputedStyle(this[0])[param]
  }
}

function attr(param) {
  const type = wt(param).type
  
  if (type === 'Object') {
    wt(this).each(node => {
      wt(param).each((item, key) => {
        node.setAttribute(key, item)
      })
    })
    return this
  }

  if (type === 'String') {
    return this[0].getAttribute(param)
  }

  if (type === 'Array') {
    const arr = []
    wt(param).each(v => {
      arr.push(this[0].getAttribute(v))
    })
    return arr
  }
  return this
}

function prop(...params) {
  const len = params.length 
  if (len === 1) {
    return this[0][params[0]]
  }
  if (len === 2) {
    wt(this).each(node => {
      node[params[0]] = params[1]
    })
    return this
  }
  return this
}

function append(child, deep = true) {
  wt(this).each(node => {
    node.appendChild(child.cloneNode(deep))
  })
  return this
}

function on(type, handler, propagation = true) {
  const t = wt(handler).type
  if (t === 'Object') {
    wt(this).each(node => {
      node.addEventListener(type, e => {
        const className = e.target.className
        const targetClass = className && className.split(' ')[0]
        handler[targetClass] && handler[targetClass](node, e)
      }, propagation)
    })
    return this
  }
  if (t === 'Function') {
    wt(this).each(node => {
      node.addEventListener(type, handler, propagation)
    })
    return this
  }
  return this
}

function off(type, handler) {
  wt(this).each(node => {
    node.removeEvent(type, handler)
  })
  return this
}



function setNode() {

}

function find(qs, dataType) {
  const nl = $()
  nl.push(this[0].querySelectorAll(qs)) 
  return nl
}

export {
  $, hasClass, addClass, removeClass, attr,
  on, off, find, append, css, prop, setNode
}