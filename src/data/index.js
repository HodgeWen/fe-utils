import { getType, each, eachObj } from "../common"

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

wt.use = function(funcs) {
  eachObj(funcs, (v, k) => {
    pt[k] = v
  })
}

export default wt

export { add, minus, set, toTree, quickSort, binarySearch } from "./array"

export { serialize, dataReset, keys, values, merge, from } from "./object"

export { json, repeat, replace } from "./string"

export { isArr, isObj, isFunc, isStr, isNum, isBoo } from "./types"

export { map, extend, copy } from "./common"
