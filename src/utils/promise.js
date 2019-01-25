const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"
const _define = function (obj, prop, value, fn) {
  Object.defineProperty(obj, prop, {
    get () {
      return value
    },
    set(newValue) {
      value = newValue
      fn(obj)
    }
  })
}

const _getDefine = (obj, prop) => Object.getOwnPropertyDescriptor(obj, prop)

function Pro(fn) {
  const that = this
  this.state = PENDING
  this.excuteStack = []
  function resolve(value) {
    if (that.state !== PENDING) return
    that.value = value
    that.state = RESOLVED
    that.resolved = true
  }

  function reject(err) {
    if (that.state !== PENDING) return
    that.err = err
    that.state = REJECTED
    that.rejected = true
  }

  fn(resolve, reject)
}

pt = Pro.prototype = Object.create(null)

pt.constructor = Pro

pt.then = function(fn) {
  this.excuteStack.push(fn)
  console.log(this.excuteStack)
  const hasDefineValue = _getDefine(this, 'value')
  if (hasDefineValue) return this
  _define(this, 'value', this.value, ctx => {
    const value = this.excuteStack[0](ctx.value)
    value ? ctx.value = value : false
    this.excuteStack.shift()
  })
  return this
}

pt.catch = function(fn) {
  _define(this, 'rejected', false, ctx => {
    fn(ctx.err)
  })
}

const p1 = new Pro((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
    // reject('失败')
  }, 1000);
})

async function aa() {
  let a = 1
  p1.then(res => {
    return 2
  }).then(res => console.log(res))
}
aa()
// p1.then(res => 2).then(res => console.log(res))//catch(err => console.log(err))

// export default Pro
