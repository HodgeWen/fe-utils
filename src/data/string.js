import { each, getCtx } from "../common"

// 字符串转成json
function json(separator = '&') {
  const ret = {}
  const ctx = getCtx(this)
  const str = ctx[0] === '?' ? ctx.slice(1) : ctx
  if (str) {
    const couple = str.split(separator)
    each(couple, v => {
      const arr = v.split("=")
      const key = arr[0].trim()
      const val = arr[1].trim()
      ret[key] = val
    })
  }
  return ret
}


function upper() {
  
}

function lower() {

}

json.key = 'json'

export { json }
