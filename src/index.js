import $, {
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
} from "./dom"

import wt, {
  add,
  minus,
  set,
  serialize,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum
} from "./data"

import { cookie, url, dateFormat, WStore } from "./utils"

const utils = {
  cookie,
  url,
  dateFormat,
  WStore
}

$.use(
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
)

wt.use(add, minus, set, serialize, json, isArr, isObj, isFunc, isStr, isNum)

export { $, wt, utils }
