import $, {
  find,
  eq,
  not,
  hasClass,
  addClass,
  removeClass,
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
  map,
  keys,
  values
} from "./data"

import { cookie, url, dateFormat, WStore } from "./utils"

const utils = {
  cookie,
  url,
  dateFormat,
  WStore
}

$.use(
  find,
  eq,
  not,
  hasClass,
  addClass,
  removeClass,
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
  map,
  keys,
  values
)

export { $, wt, utils }
