import { add, minus } from './utils/array.js'
import cookie from './utils/cookie.js'
import { serialize } from './utils/object'
import { json } from './utils/string.js'


function Data(any) {
  this.data = any
  this.type = this.getType()
}

const pt = Data.prototype = Object.create(null)
pt.constructor = Data

function wt(any) {
  return new Data(any)
}
wt.use = function (...funcs) {
  for (let i = 0, len = funcs.length; i < len; i++) {
    pt[funcs[i].name] = funcs[i]
  }
}
wt.use(getType, each)

function getType(data) {
  const ctx = data ? data : this.data
  return Object.prototype.toString.call(ctx).slice(8, -1) 
}

function each(handle) {
  const data = this.data || this
  const type = this.getType ? this.getType(data) : getType(data)

  // 普通对象
  if (type === 'Object' && data.length === undefined) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (handle(data[key], key, data) === false) return false
      }
    }
    return true
  }
  // 数字
  if (type === 'Number') {
    for (let i = 1; i <= data; i++) {
      if (handle(i, data) === false) return false
    }
    return true
  }
  // 数组或者伪数组
  for (let i = 0, len = data.length; i < len; i++) {
    if (handle(data[i], i, data) === false) return false
  }
  return true
}

export {
  wt, getType, each,
  add, minus,
  cookie,
  serialize,
  json
}