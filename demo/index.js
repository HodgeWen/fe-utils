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

import { cookie, url, dateFormat } from "../src/index"

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
wt
  .use
  // add,
  // minus,
  // serialize
  // json,
  // isArr,
  // isObj,
  // isFunc,
  // isStr,
  // isNum
  ()
window.wt = wt
window.$ = $
window.url = url
window.cookie = cookie
window.dateFormat = dateFormat
