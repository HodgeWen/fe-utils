import {
  add,
  minus
} from './data-convert/array.js'
import cookie from './data-convert/cookie.js'
import {
  serialize
} from './data-convert/object'
import {
  json
} from './data-convert/string.js'

import {
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum
} from './data-convert/types'

function DataWrap(any) {
  this.data = any
  this.type = this.getType()
}

const pt = DataWrap.prototype = Object.create(null)

pt.constructor = DataWrap

pt.getType = function () {
  return Object.prototype.toString.call(this.data).slice(8, -1)
}

pt.each = function (handle) {
  const data = this.data
  const type = this.getType()

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



function wt(any) {
  return new DataWrap(any)
}

wt.use = function (...funcs) {
  wt(funcs).each(fn => pt[fn.name] = fn)
}

export {
  wt,
  add,
  minus,
  cookie,
  serialize,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum
}