import { getType } from "../common"

function map(fn) {
  const ctx = this.data !== undefined ? this.data : this
  const type = getType(ctx)
  if (type === "Array") {
    return ctx.map(fn)
  }
  if (type === "String") {
    return ctx
      .split("")
      .map(fn)
      .join("")
  }
  return false
}

function extend(sup) {
  const ctx = this.data !== undefined ? this.data : this
  const proto = Object.create(sup.prototype)
  proto.constructor = ctx
  ctx.prototype = proto
}

map.key = 'map'
extend.key = 'extend'

export { map, extend }
