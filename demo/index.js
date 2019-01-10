// import { 
//   $, hasClass, addClass, removeClass, attr,
//   on, off, find, append, css, prop, setNode
// } from '../src/index'

// $.use(
//   hasClass, addClass, removeClass, attr,
//   on, off, find, append, css, prop, setNode
// )
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
} from '../src/index'
wt.use(
  add,
  minus,
  serialize,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum
)
window.wt = wt