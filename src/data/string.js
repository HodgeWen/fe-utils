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
      ret[key] = val
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

export function replace (place, joiner = '') {
  const ctx = getCtx(this)
  
  return getType(place) === 'Array' ?
    ctx.slice(0, place[0]) + ctx.slice(place[0], place[1]).replace(/./g, joiner) + ctx.slice(place[1]) :
    ctx.slice(0, place) + ctx.slice(place).replace(/./g, joiner)
}
