import { each, getCtx, getType } from '../common'

interface Query {
  [prop: string]: any
}

export function add(...args: any[]) {
  let ctx = getCtx(this)
  let len = args.length
  if (len < 1) return ctx 

  let ret: any[] = [], i = -1
  
  while (++i < len) {
    getType(args[i]) !== "Array" ? ret.push(args[i]) : ret = ret.concat(args[i])
  }
  return ctx.concat(ret)
}

export function findIndex(query: Query): number {
  const ctx = getCtx(this)
  const len = ctx.length
  if (query === undefined) return -1

  const type = getType(query)
  if (type !== 'Object' && type !== 'Array') {
    let i = -1
    while (++i < len) {
      if (query === ctx[i]) return i
    }
    return -1
  }
  let i = -1
  while (++i < len) {
    let isMatched = true
    for (const key in query) {
      if (ctx[i][key] !== query[key]) {
        isMatched = false
        continue
      }
    }
    if (isMatched) return i
  }
  return -1
}

export function has(query: Query) {
  const ctx = getCtx(this)
  return findIndex.call(ctx, query) !== -1
}

export function set(id: string) {
  const ctx = getCtx(this)

  if (Array.from && id === undefined) {
    return Array.from(new Set(ctx))
  }

  const obj = Object.create(null)
  const arr: any[] = []
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

export function binarySearch(...args: any[]) {
  const ctx = getCtx(this)
  let start = 0
  let end = ctx.length - 1
  function getMid () {
    return Math.floor((start + end) / 2)
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
