import { each, eachObj, getType, getCtx } from "../common"

export function serialize(separator = "&") {
  let ret = ""
  const ctx = getCtx(this)
  eachObj(ctx, (val, key) => {
    const value = val && typeof val === "object" ? JSON.stringify(val) : val
    const g = `${encodeURIComponent(key)}=${encodeURIComponent(value) + separator}`
    ret += g
  })
  return ret.slice(0, -1)
}

export function dataReset() {
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

export function keys() {
  const ctx = getCtx(this)
  if (!Object.keys) {
    const type = getType(ctx)
    const arr = []
    type === 'Object' ? eachObj(ctx, v => arr.push(v)) : each(ctx, (_, i) => arr.push(i + ''))
    return arr
  }
  return Object.keys(ctx)
}

export function values() {
  const ctx = getCtx(this)
  if (!Object.values) {
    const arr = []
    eachObj(ctx, v => arr.push(v))
    return arr
  }
  return Object.values(ctx)
}

export function merge(...args) {
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

export function from(obj) {
  const ctx = getCtx(this)
  const ret = {}
  eachObj(ctx, (val, key) => {
    if (obj[key]) {
      ctx[key] = obj[key]
      ret[key] = obj[key]
    } 
  })
  return ret
}
