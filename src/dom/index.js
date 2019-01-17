import { find, eq } from "./selector"

import { hasClass, addClass, removeClass } from "./class"

import { attr, prop } from "./attribute"

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
  resize
} from "./event"

import { css } from "./style"

function Selector(str) {
  this.length = 0
  if (typeof str === "string") {
    this.selector = str
    const nodeList = document.querySelectorAll(str)
    this.push(...nodeList)
  } else {
    this.push(str)
  }
}

const pt = (Selector.prototype = Object.create(null))

const ap = Array.prototype

pt.constructor = Selector
pt.push = ap.push
pt.slice = ap.slice
pt.splice = ap.splice
pt.each = function(callback) {
  for (let i = 0, len = this.length; i < len; i++) {
    callback(this[i], i)
  }
}

function $(str) {
  return new Selector(str)
}

$.use = function(...funcs) {
  for (let i = 0, len = funcs.length; i < len; i++) {
    pt[funcs[i].name] = funcs[i]
  }
}

export default $

export {
  hasClass,
  addClass,
  removeClass,
  attr,
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
  find,
  append,
  css,
  prop,
  eq
}
