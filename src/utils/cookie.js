import { json, serialize } from "../data"
import { each, getType } from '../common'

class Cookie {
  get(key) {
    const ret = json.call(document.cookie, ';')
    return key !== undefined ? ret[key] : ret
  }

  set(conf, expiresDay = null) {
   
    document.cookie = serialize.call(conf, ';')
  }

  remove(...args) {
    let date = new Date()
    let expires = date.setTime(+date - 1)

    each(args, arg => {
      document.cookie = serialize
    })
  }
}

export default new Cookie()
