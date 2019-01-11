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
  setNode,
  eq
} from "../src/index"

import {
  wt,
  add,
  minus,
  serialize,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum
} from "../src/index"

import { cookie, url } from "../src/index"

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
  setNode,
  eq
)
wt.use(
  // add,
  // minus,
  // serialize
  // json,
  // isArr,
  // isObj,
  // isFunc,
  // isStr,
  // isNum
)
window.wt = wt
window.$ = $
window.url = url
window.cookie = cookie
