import { each } from "../common"

// 字符串转成json
function json() {
  const ret = {}
  const data = this.data !== undefined ? this.data : this
  const str = data.indexOf("?") === 0 ? data.slice(1) : data
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

json.name = 'json'

export { json }
