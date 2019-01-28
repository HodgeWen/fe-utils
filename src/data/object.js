import { eachObj, getType, getCtx } from "../common"

function serialize() {
  let ret = ""
  const ctx = getCtx(this)
  eachObj(ctx, (val, key) => {
    const g =
      val && typeof val === "object"
        ? `${key}=${JSON.stringify(val)}&`
        : `${key}=${encodeURIComponent(val)}&`
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

serialize.key = 'serialize'
dataReset.key = 'dataReset'
keys.key = 'keys'
values.key = 'values'

export { serialize, dataReset, keys, values }
