import { eachObj, getType } from "../common"

function serialize() {
  let ret = ""
  const data = this.data !== undefined ? this.data : this
  eachObj(data, (val, key) => {
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
  const ctx = this.data !== undefined ? this.data : this
  const table = {
    'Array' : [],
    'Object': {},
    'Number': 0,
    'String': ''
  }
  eachObj(ctx, (v, key) => {
    ret[key] = table[getType(v)]    
  })
  return ret
}

export { serialize, dataReset }
