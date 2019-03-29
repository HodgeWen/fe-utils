import { each, getType, eachObj } from "../common"

class Cookie {
  constructor () {
    this.initialized = false
    this.cookie = Object.create(null)
  }

  _update (key, value, date, days) {
    date.setTime(+date + 86400000 * days)
    const expires = date.toUTCString()
    const type = getType(value)
    const isObjOrArr = type === 'Object' || type === 'Array'
    value = isObjOrArr ? encodeURIComponent(JSON.stringify(value)) : value
    days > 0 && (this.cookie[key] = value)
    document.cookie = `${key}=${value}; expires=${expires}`
  }

  init () {
    document.cookie.split(';').map(v => decodeURIComponent(v).trim().split('=')).forEach(v => this.cookie[v[0]] = !window.isNaN(+v[1]) ? +v[1] : v[1])
    this.initialized = true
  }

  get (key) {
    !this.initialized && this.init()   // 先执行初始化操作
    return key ? this.cookie[key] : this.cookie
  }

  set (...args) {
    !this.initialized && this.init()   // 先执行初始化操作
    const [first, second, third] = args
    const isObject = getType(first) === 'Object'
    const date = new Date()
    const days = isObject ? (second || 30) : (third || 30)
    isObject ? eachObj(first, (val, key) => this._update(key, val, date, days)) : this._update(first, second, date, days)
  }

  remove (...args) {
    !this.initialized && this.init()   // 先执行初始化操作
    const date = new Date()
    each(args, arg => {
      if (!this.cookie[arg]) return false
      this._update(arg, '', date, -1)
      delete this.cookie[arg]
    })
  }

}

export default new Cookie()
