import { each, getCtx, getType } from '../common'

export function add(...args) {
  let ctx = getCtx(this)
  let len = args.length
  if (len < 1) return ctx 

  let ret = [], i = -1
  
  while (++i < len) {
    getType(args[i]) !== "Array" ? ret.push(args[i]) : ret = ret.concat(args[i])
  }
  return ctx.concat(ret)
}

export function minus(arr) {
  const ctx = getCtx(this)
  ctx
}

export function set(id) {
  const ctx = getCtx(this)

  if (Array.from && id === undefined) {
    return Array.from(new Set(ctx))
  }

  const obj = Object.create(null)
  const arr = []
  if (id === undefined) {
    each(ctx, (v) => {
      const key = typeof v + v
      if (!obj[key]) {
        obj[key] = true
        arr.push(v)
      }
    })
    return arr
  }
  each(ctx, (v) => {
    const key = v[id]
    if (!obj[key]) {
      obj[key] = true
      arr.push(v)
    }
  })
  return arr
}

export function binarySearch(...args) {
  const ctx = getCtx(this)
  let start = 0
  let end = ctx.length - 1
  function getMid () {
    return parseInt((start + end) / 2)
  }
  let midIndex = getMid()

  let [value, key] = args
  if (key === undefined) {
    while (start <= end) {
      if (value > ctx[midIndex] ) {
        start = midIndex + 1
        midIndex = getMid()
      } else if (value < ctx[midIndex]) {
        end = midIndex - 1
        midIndex = getMid()
      } else {
        return midIndex
      }
    }
    return -1
  }
  while (start <= end) {
    if (value > ctx[midIndex][key] ) {
      start = midIndex + 1
      midIndex = getMid()
    } else if (value < ctx[midIndex][key]) {
      end = midIndex - 1
      midIndex = getMid()
    } else {
      return midIndex
    }
  }
  return -1
}

export function toTree() {

}

export function quickSort() {

}
