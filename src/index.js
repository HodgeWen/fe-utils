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
  change,
  css
} from "./dom"

import wt from "./data"

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
  change,
  css
)


export { $, wt, utils }
