import { find, eq, not } from "./selector"

import { hasClass, addClass, removeClass, toggleClass } from "./class"

import { attr, prop, val, html, text } from "./attribute"

import { append } from "./element"

import {
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
} from "./event"

import { css } from "./style"

function Selector(str) {
  this.length = 0
  if (typeof str === "string") {
    this.selector = str
    const nodeList = document.querySelectorAll(str)
    this.push.apply(this, nodeList)
  } else {
    this.push(str)
  }
}

const pt = (Selector.prototype = Object.create(null))

const ap = Array.prototype

pt.constructor = Selector
pt.push = ap.push
pt.splice = ap.splice
pt.each = function(callback) {
  let i = -1
  const len = this.length
  while (i++ < len) {
    callback(this[i], i)
  }
}

pt.env = (function () {
  const ua = navigator.userAgent.toLowerCase()
  const isLtIe11 = ua.match(/msie\s[\d\.]+/) 
  const isGtIe10 = isLtIe11 && +isLtIe11[0].split(' ')[1] >= 10
  return !isLtIe11 || isGtIe10
})()

function $(str) {
  return new Selector(str)
}

$.use = function(...funcs) {
  for (let i = 0, len = funcs.length; i < len; i++) {
    if (!pt[funcs[i].key]) {
      pt[funcs[i].key] = funcs[i]
    }
  }
}

export default $

export {
  find,
  eq,
  not,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  attr,
  prop,
  val,
  html,
  text,
  append,
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
  css
}
