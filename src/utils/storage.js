import { eachObj } from "../common"

export default class {
  constructor(type) {
    const table = {
      session: window.sessionStorage,
      local: window.localStorage
    }
    this.storage = table[type]
  }

  get(key) {
    return this.storage.getItem(key)
  }

  set(obj) {
    eachObj(obj, (val, key) => {
      this.storage.setItem(key, val)
    })
  }
}
