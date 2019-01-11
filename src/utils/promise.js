const RESOLVED = 'resolved'

const REJECTED = 'rejected'

function Pro(fn) {
  const that = this
  this.value = null

  function resolve (res) {
    that.value = res
    that.state = RESOLVED
  }

  function reject (err) {
    that.value = err
    that.state = REJECTED
  }
  
  fn(resolve, reject)
}

pt = Pro.prototype = Object.create(null)

pt.constructor = Pro

pt.then = function (success, failed) {
  const that = this
  let state = 'pending'
  Object.defineProperty(this, 'state', {
    get () {
      return state
    },
    set (newValue) {
      state = newValue
      if (state === RESOLVED) {
        success(that.value)
      }
      if (state === REJECTED) {
        failed(that.value)
      }
    }
  })
}

pt.catch = function (fn) {
  const that = this
  fn(this.value)
}

const p = new Pro((resolve, reject) => {
  setTimeout(() => {
    // resolve('成功')
    reject('失败')
  }, 1000)
})

p.then((res) => {
  console.log(res)
})

// export default Pro