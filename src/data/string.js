import { each } from "../common"

// 字符串转成json
function json() {
  const ret = {}
  const ctx = this.data !== undefined ? this.data : this
  const str = ctx.indexOf("?") === 0 ? ctx.slice(1) : ctx
  if (str) {
    const couple = str.split("&")
    each(couple, v => {
      const arr = v.split("=")
      const key = arr[0]
      const val = arr[1]
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
