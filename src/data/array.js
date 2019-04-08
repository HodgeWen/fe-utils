import { each, getCtx, getType } from '../common'

function add(...args) {
  let ctx = getCtx(this)
  let i = -1, len = args.length
  if (len < 1) return ctx 

  let ret = []

  while (++i < len) {
    getType(args[i]) !== "Array" ? ret.push(args[i]) : ret = ret.concat(args[i])
  }
  return ctx.concat(ret)
}

function minus(arr) {
  const ctx = getCtx(this)
}

function set(id) {
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

function binarySearch(value) {
  const ctx = getCtx(this)
  let start = 0
  let end = ctx.length - 1
  function getMid () {
    return parseInt((start + end) / 2)
  }
  let midIndex = getMid()
  while (start <= end) {
    if (value > ctx[midIndex] ) {
      start = midIndex
      midIndex = getMid()
    } else if (value < ctx[midIndex]) {
      end = midIndex
      midIndex = getMid()
    } else {
      start = midIndex
      return midIndex
    }
  }
}

function toTree() {

}

function quickSort() {

}

add.key = 'add'
minus.key = 'minus'
set.key = 'set'
toTree.key = 'toTree'
quickSort.key = 'quickSort'
binarySearch.key = 'binarySearch'

export { add, minus, set, toTree, quickSort, binarySearch }
