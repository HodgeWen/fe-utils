import { wt, json, serialize } from "../data"

// wt.use(json, serialize)
class Cookie {
  get(key) {
    const json = wt(document.cookie).json()
    return key !== undefined ? json[key] : json
  }

  set(conf) {
    document.cookie = wt(conf).serialize()
  }
}

export default new Cookie()
