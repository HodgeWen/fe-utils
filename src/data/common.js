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

map.key = 'map'

export { map }
