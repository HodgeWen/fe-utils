import Store from './storage'
import Cookie from './storage'

export default new class Cache {

  constructor () {
    this.tactics = {
      sessionStorage: () => new Store('session'),
      localStorage: () => new Store('local'),
      cookie: () => new Cookie()
    }
  }

  create (type) {
    if (!this[type]) {
      const fn = this.tactics[type]
      this[type] = fn ? fn() : null
    }
    return this[type]
  }
}