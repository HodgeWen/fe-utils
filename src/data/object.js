import {each, eachObj, getType, getCtx } from "../common"

function serialize(separator = '&') {
  let ret = ""
  const ctx = getCtx(this)
  eachObj(ctx, (val, key) => {
    const g =
      val && typeof val === "object"
        ? `${key}=${JSON.stringify(val) + separator}`
        : `${key}=${encodeURIComponent(val) + separator}`
    ret += g
  })
  return ret.slice(0, -1)
}

function dataReset() {
  const ret = {}
  const ctx = getCtx(this)
  const table = {
    Array: [],
    Object: {},
    Number: 0,
    String: ""
  }
  eachObj(ctx, (v, key) => {
    ret[key] = table[getType(v)]
  })
  return ret
}

function keys () {
  const ctx = getCtx(this)
  return Object.keys(ctx)
}

function values () {
  const ctx = getCtx(this)
  if (!Object.values) {
    const arr = []
    eachObj(ctx, v => arr.push(v))
    return arr
  }
  return Object.values(ctx)
}

function merge (...args) {
  const ctx = getCtx(this)
  const ret = {}
  eachObj(ctx, (val, key) => {
    ret[key] = val
  })
  each(args, obj => {
    eachObj(obj, (val, key) => {
      if (!(key in ret)) {
        ret[key] = val
      }
    })
  })
  
  return ret
}

serialize.key = 'serialize'
dataReset.key = 'dataReset'
keys.key = 'keys'
values.key = 'values'
merge.key = 'merge'

export { serialize, dataReset, keys, values, merge }
