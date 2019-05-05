import { each, getCtx, getType } from '../common'

// 字符串转成json
export function json(separator = '&') {
  const ret = {}
  const ctx = getCtx(this)
  const str = ctx[0] === '?' ? ctx.slice(1) : ctx
  if (str) {
    const couple = str.split(separator)
    each(couple, v => {
      const arr = v.split('=')
      const key = arr[0].trim()
      const val = arr[1].trim()
      ret[key] = decodeURIComponent(val)
    })
  }
  return ret
}

export function repeat(num, joiner = '') {
  const ctx = getCtx(this)
  if (num === undefined) {
    return ctx
  }
  let i = 0,  ret = ''
  while (i < num) {
    ret += ctx + joiner
    i++
  }
  return ret.replace(new RegExp(joiner + '$'), '')
}

export function replace (...args) {
  const ctx = getCtx(this)
  const len = args.length
  if (len === 0) return ctx

  const joiner = args[len - 1]

  if (len === 1) return joiner

  if (len === 2) {
    const place = args[0]
    return getType(place) === 'Array' ?
    ctx.slice(0, place[0]) + ctx.slice(place[0], place[1]).replace(/./g, joiner) + ctx.slice(place[1]) :
    ctx.slice(0, place) + ctx.slice(place).replace(/./g, joiner)
  }

  if (len === 3) {
    const p1 = args[0], p2 = args[1]
    return ctx.slice(0, p1) + ctx.slice(p1, p2).replace(/./g, joiner) + ctx.slice(p2) 
  }
 
}
