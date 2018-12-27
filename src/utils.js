import { add, minus } from './utils/array.js'
import cookie from './utils/cookie.js'
import { serialize } from './utils/object'
import { json } from './utils/string.js'


function Data(any) {
  this.data = any
  this.type = this.getType()
}

function wt(any) {
  return new Data(any)
}

const pt = Data.prototype = Object.create(null)
pt.constructor = Data
pt.getType = getType
pt.each = each
pt.use = function (...funcs) {
  for (let i = 0, len = funcs.length; i < len; i++) {
    pt[funcs[i].name] = funcs[i]
  }
}

function getType(data) {
  const ctx = data ? data : this.data
  return Object.prototype.toString.call(ctx).slice(8, -1) 
}

function each(handle) {
  const data = this.data || this
  const type = this.getType ? this.getType(data) : getType(data)

  if (type === 'Array') {
    for (let i = 0, len = data.length; i < len; i++) {
      if (handle(data[i], i, data) === false) return false
    }
    return true
  }
  if (type === 'Object') {
    for (let key in data) {
      if (handle(data[key], key, data) === false) return false
    }
    return true
  }
  if (type === 'Number') {
    for (let i = 1; i <= data; i++) {
      if (handle(i, data) === false) return false
    }
    return true
  }
  return null
}

export {
  wt, getType, each,
  add, minus,
  cookie,
  serialize,
  json
}