import { eachObj, getType } from "../common"

export default class WStore {
  constructor(type) {
    const table = {
      session: window.sessionStorage,
      local: window.localStorage
    }
    this.storage = table[type]
  }

  get(key) {
    const reg = /^[\[\{].*[\}\]]$/
    if (key === undefined) {
      const ret = {}
      eachObj(this.storage, (val, key) => {
        ret[key] = reg.test(val) ? JSON.parse(val) : val
      })
      return ret
    }
    const value = this.storage.getItem(key)
    return reg.test(value) ? JSON.parse(value) : value
  }

  set(...args) {
    const p1 = args[0]
    const p2 = args[1]
    let type = ""
    let ret = ""
    if (args.length === 1) {
      eachObj(p1, (val, key) => {
        type = getType(val)
        ret = type !== "Object" && type !== "Array" ? val : JSON.stringify(val)
        this.storage.setItem(key, ret)
      })
      return this
    }
    type = getType(p2)
    ret = type !== "Object" && type !== "Array" ? p2 : JSON.stringify(p2)
    this.storage.setItem(p1, ret)
    return this
  }

  clear() {
    this.storage.clear()
  }
}
