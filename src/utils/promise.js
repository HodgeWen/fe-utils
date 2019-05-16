// Promise A+规范
// 三个状态 1. pending 处理中 2. fulfilled 已成功 3. reject 已失败
// 为fulfilled或reject时才会有值
// 提供then方法，在pendding阶段不会被调用 接收两个参数 onFulfilled, onRejected
// 4 then方法返回一个新的Promise对象, 并且resolve上一个promise对象的回调返回值

// const resolve = ctx => {
//   return value => {
//     ctx.value = value
//     ctx.status = 'resolved'
//     if (!ctx.thenMethod) return
//     ctx.value = ctx.thenExcute(this.value)
//   }
// }

// const reject = ctx => {
//   return value => {
//     ctx.value = value
//     ctx.status = 'rejected'
//     if (!ctx.cacthErr) throw ctx.value
//     ctx.value = this.cacthErr(value)
//   }
// }

export default class BlackBox {
  constructor(fn) {
    this.value = undefined
    this.status = 'pending'
    this.queue = []

    const resolve = value => {
      this.value = value
      this.status = 'resolved'
      if (!this.thenMethod) return
      this.value = this.thenMethod(this.value)
    }

    const reject = value => {
      this.value = value
      this.status = 'rejected'
      if (!this.cacthErr) throw this.value
      this.value = this.cacthErr(this.value)
    }

    fn(resolve, reject)
  }

  then(onResolved, onRejected) {
    if (this.status === 'pending') {
      this.queue.push(onResolved)
      this.cacthErr = onRejected
    }
    this.value = this.status === 'resolved' ? onResolved(this.value) : onRejected(this.value)
    return this
  }

  catch(onCatched) {
    if (this.status === 'pending') {
    }
    return this.status === 'resolved'
      ? this
      : new this.constructor((resolve, reject) => {
          resolve(onCatched(this.value))
        })
  }

  static resolve(val) {
    return new this(resolve => resolve(val))
  }

  static reject(val) {
    return new this((_, reject) => reject(val))
  }

  static all(arr) {}

  static race(arr) {}
}
