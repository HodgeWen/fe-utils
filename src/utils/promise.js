const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"
const _define = function(obj, prop, value, fn) {
  Object.defineProperty(obj, prop, {
    get() {
      return value
    },
    set(newValue) {
      value = newValue
      fn(value)
    }
  })
}

const _getDefine = (obj, prop) => Object.getOwnPropertyDescriptor(obj, prop)

function Pro(fn) {
  const that = this
  this.status = PENDING
  this.excuteStack = []
  function resolve(value) {
    if (that.status !== PENDING) return
    that.status = RESOLVED
    that.value = value
  }

  function reject(err) {
    if (that.status !== PENDING) return
    that.status = REJECTED
    that.err = err
  }

  fn(resolve, reject)
}

const pt = (Pro.prototype = Object.create(null))

pt.constructor = Pro

pt.then = function(fn) {
  this.excuteStack.push(fn)
  const hasDefineValue = _getDefine(this, "value")
  if (hasDefineValue) return this
  _define(this, "value", null, val => {
    if (!this.excuteStack.length) return false
    const returnedValue = this.excuteStack[0](val)
    this.excuteStack.shift()
    if (returnedValue !== undefined) {
      this.value = returnedValue
    }
  })
  return this
}

pt.catch = function(fn) {
  const hasDefineErr = _getDefine(this, "err")
  if (hasDefineErr) return this
  _define(this, "err", null, err => {
    fn(err)
  })
  return this
}

export default Pro
