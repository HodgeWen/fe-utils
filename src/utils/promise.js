// Promise A+规范
// 1.状态: pending 处理中  fulfilled 已成功   reject 已失败
// 2.值: value fulfilled后可访问 表示成功的返回值   reason rejected后可以访问 表示失败的原因
// 3.方法: 提供then方法，在pendding阶段不会被调用 接收两个参数 onFulfilled, onRejected
// onFulfilled， onRejected 为函数则可以在promise状态改变后执行
// 4. then方法返回一个新的Promise对象, 并且resolve上一个promise对象的回调返回值

export default class BlackBox{
  constructor(fn) {
    this.value = null
    // 队列
    this.queue = []
    // 监听对象的状态变化
    this._define(status => {
      if (status === 'resolved') {
        if (!this.thenMethod) return
        this.value = this.thenMethod(this.value)
      }
      if (status === 'rejected') {
        if (!this.cacthErr) throw this.value
        this.value = this.cacthErr(this.value)
      }
    })
    // 改变状态
    fn(
      val => {
        this.value = val
        this.status = 'resolved'
      },
      reason => {
        this.value = reason
        this.status = 'rejected'
      }
    )
  }

  then(onResolved, onRejected) {
    this.value ? onResolved(this.value) : this.thenMethod = onRejected
    this.value ? onRejected(this.value) : this.cacthErr = onRejected
    return this.constructor.resolve(this)
  }

  catch(onCatched) {
    onCatched && (this.value ? onCatched(this.value) : this.cacthErr = onCatched)
    return this.constructor.reject(this)
  }

  // 监听status属性
  _define(fn) {
    let status = 'pending'
    Object.defineProperty(this, 'status', {
      get() {
        return status
      },
      set(newStatus) {
        status = newStatus
        fn(status)
      }
    })
  }

  static resolve(val) {
    return new this(resolve => resolve(val))
  }

  static reject(val) {
		return new this((_, reject) => reject(val))
	}

  static all(arr) {
		const ret = []
		arr.forEach(p => {
			p.then()
		})
	}
// p = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		reject(1111)
// 	}, 2000);
// })
  static race() {}
}
