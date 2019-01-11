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
    const value = this.storage.getItem(key)
    const reg = /^[\[\{].*[\}\]]$/
    return reg.test(value) ? JSON.parse(value) : value
  }

  set(obj) {
    let type = ""
    let ret = ""
    eachObj(obj, (val, key) => {
      type = getType(val)
      ret = type !== "Object" && type !== "Array" ? val : JSON.stringify(val)
      this.storage.setItem(key, ret)
    })
  }
}
