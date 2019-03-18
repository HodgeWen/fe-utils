import { json } from "../data"
import { each, getType, eachObj } from "../common"

class Cookie {

  constructor () {
    // 未初始化状态
    this.hasInit = false
    this.cookie = null
  }

  // 获取cookie
  get(key) {
    if (this.hasInit) return key !== undefined ? this.cookie[key] : this.cookie
    this.cookie = json.call(document.cookie, ";")
    this.hasInit = true
    return key !== undefined ? this.cookie[key] : this.cookie
  }

  // 设置cookie
  set(conf, expiresDay = null) {
    let expires = ''
    if (getType(expiresDay) === 'Number') {
      const date = new Date()
      date.setTime(+date + 86400000 * expiresDay)
      expires = '; expires=' + date.toUTCString()
    } 
    eachObj(conf, (val, key) => {
      document.cookie = `${key}=${val}${expires}`
    })
    this.hasInit = false
  }

  // 删除cookie
  remove(...args) {
    let date = new Date()
    let expires = date.toUTCString()
    each(args, arg => {
      document.cookie += arg + "=''; expires=" + expires
    })
    this.hasInit = false
  }

}

export default new Cookie()
