import { eachObj } from "../common"

function serialize() {
  let ret = ""
  const data = this.data !== undefined ? this.data : this
  eachObj(data, (val, key) => {
    ret += `${key}=${val}&`
  })
  return ret.slice(0, -1)
}

export { serialize }
