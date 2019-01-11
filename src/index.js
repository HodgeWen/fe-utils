import {
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
} from "./dom"

import {
  wt,
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

import { cookie, url, dateFormat } from "./utils"

const utils = {
  cookie,
  url,
  dateFormat
}

$.use(
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
)

wt.use(add, minus, set, serialize, json, isArr, isObj, isFunc, isStr, isNum)

export { $, wt, utils }
