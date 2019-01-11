import { add, minus, set } from "./array"

import { serialize } from "./object"

import { json } from "./string"

import { getType } from '../common'

import { isArr, isObj, isFunc, isStr, isNum } from "./types"

function DataWrap(any) {
  this.data = any
  this.type = getType(any)
}

const pt = (DataWrap.prototype = Object.create(null))

pt.constructor = DataWrap

pt.each = function(handle) {
  const data = this.data ? this.data : this
  const type = getType(data).slice(data)

  // 普通对象
  if (type === "Object" && data.length === undefined) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (handle(data[key], key, data) === false) return false
      }
    }
    return true
  }
  // 数字
  if (type === "Number") {
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

wt.use = function(...funcs) {
  wt(funcs).each(fn => {
    const key = fn.name
    if (!pt[key]) {
      pt[key] = fn
    }
  })
}

export { wt, add, minus, set, serialize, json, isArr, isObj, isFunc, isStr, isNum }
