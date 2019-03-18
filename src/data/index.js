import { add, minus, set, toTree, quickSort } from "./array"

import { serialize, dataReset, keys, values, merge, from } from "./object"

import { json } from "./string"

import { getType, each } from "../common"

import { isArr, isObj, isFunc, isStr, isNum, isBoo } from "./types"

import { map, extend, copy } from "./common"

function DWrap(any) {
  this.data = any
  this.type = getType(any)
}

const pt = (DWrap.prototype = Object.create(null))

pt.constructor = DWrap

pt.eachType = Object.freeze({
  Array(data, handle) {
    let i = -1, len = data.length
    while (++i < len) {
      if (handle(data[i], i, data) === false) return false
    }    
    return true
  },
  Object(data, handle) {
    for (let key in data) {
      if (
        data.hasOwnProperty(key) &&
        handle(data[key], key, data) === false
      ) {
        return false
      }
    }
    return true
  },
  Number(data, handle) {
    let i = 0
    if (data <= 0) return false
    while (++i <= data) {
      if (handle(i, data) === false) return false
    }
    return true
  },
  String(data, handle) {
    let i = -1, len = data.length
    while (++i < len) {
      if (handle(data[i], i, data) === false) return false
    }
    return true
  }
})

pt.each = function(handle) {
  const data = this.data
  const type = getType(data)
  const fun = this.eachType[type]
  return fun ? fun(data, handle) : false
}


pt.pipe = function (...args) {
  const ctx = this
  const map = {
    String: arg => ctx[arg](),
    Function: arg => arg(ctx)
  }
  each(args, arg => {
    this.data = map[getType(arg)](arg)
    this.type = getType(this.data)
  })
  return this.data
}

function wt(any) {
  return new DWrap(any)
}

wt.use = function(...funcs) {
  each(funcs, fn => {
    const key = fn.key
    if (!pt[key]) {
      pt[key] = fn
    }
  })
}

wt.use(
  add,
  minus,
  set,
  toTree,
  quickSort,
  serialize,
  merge,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum,
  isBoo,
  dataReset,
  map,
  extend,
  copy,
  from,
  keys,
  values
)

export default wt

export {
  add,
  minus,
  set,
  toTree,
  quickSort,
  serialize,
  merge,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum,
  isBoo,
  dataReset,
  map,
  extend,
  copy,
  from,
  keys,
  values
}