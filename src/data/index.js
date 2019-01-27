import { add, minus, set } from "./array"

import { serialize, dataReset, keys, values } from "./object"

import { json } from "./string"

import { getType, each } from "../common"

import { isArr, isObj, isFunc, isStr, isNum, isBoo } from "./types"

import { map } from "./common"

function DataWrap(any) {
  this.data = any
  this.type = getType(any)
}

const pt = (DataWrap.prototype = Object.create(null))

pt.constructor = DataWrap

pt.each = function(handle) {
  const data = this.data
  const type = getType(data)
  const table = {
    Object() {
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
    Number() {
      for (let i = 1; i <= data; i++) {
        if (handle(i, data) === false) return false
      }
      return true
    },
    Array() {
      for (let i = 0, len = data.length; i < len; i++) {
        if (handle(data[i], i, data) === false) return false
      }
      return true
    },
    String() {
      for (let i = 0, len = data.length; i < len; i++) {
        if (handle(data[i], i, data) === false) return false
      }
      return true
    }
  }

  return table[type] ? table[type]() : false
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
  return new DataWrap(any)
}

wt.use = function(...funcs) {
  each(funcs, fn => {
    const key = fn.key
    if (!pt[key]) {
      pt[key] = fn
    }
  })
}

export default wt

export {
  add,
  minus,
  set,
  serialize,
  json,
  isArr,
  isObj,
  isFunc,
  isStr,
  isNum,
  isBoo,
  dataReset,
  map,
  keys,
  values
}
