import { each } from "../common"

import { find, eq } from "./selector"

import { hasClass, addClass, removeClass } from "./class"

import { attr, prop } from "./attribute"

import { append } from "./element"

import { on, off } from "./event"

import { css } from "./style"

function Selector(str) {
  this.length = 0
  if (str) {
    this.selector = str
  }
  let nodeList = document.querySelectorAll(str)
  this.push(...nodeList)
}

const pt = (Selector.prototype = Object.create(null))

const ap = Array.prototype

pt.constructor = Selector
pt.push = ap.push
pt.slice = ap.slice
pt.splice = ap.splice
pt.each = each

function $(str) {
  return new Selector(str)
}

$.use = function(...funcs) {
  for (let i = 0, len = funcs.length; i < len; i++) {
    pt[funcs[i].name] = funcs[i]
  }
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
  eq
}
