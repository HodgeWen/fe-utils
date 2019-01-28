import $, {
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
  isNum,
  isBoo,
  dataReset,
  map,
  keys,
  values,
  merge
} from "./data"

import { cookie, url, dateFormat, WStore, Pro, request } from "./utils"

const utils = {
  cookie,
  url,
  dateFormat,
  WStore,
  Pro,
  request
}

$.use(
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
)

wt.use(
  add,
  minus,
  set,
  serialize,
  merge,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum,
  isBoo,
  dataReset,
  map,
  keys,
  values
)

export { $, wt, utils }
