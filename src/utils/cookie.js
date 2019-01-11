import { json, serialize } from "../data"

class Cookie {
  get(key) {
    const ret = json.call(document.cookie)
    return key !== undefined ? ret[key] : ret
  }

  set(conf) {
    document.cookie = serialize.call(conf)
  }
}

export default new Cookie()
