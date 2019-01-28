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
  values
} from "./data"

import { cookie, url, dateFormat, WStore, Pro } from "./utils"

const utils = {
  cookie,
  url,
  dateFormat,
  WStore,
  Pro
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
  css
)

wt.use(
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
  values
)

export { $, wt, utils }
