import {each} from '../common'

function add(...args) {
  const ctx = this.data !== undefined ? this.data : this
  return ctx.concat(...args)
}

function minus(arr) {
  const ctx = this.data !== undefined ? this.data : this
  
}

function set(id) {
  const ctx = this.data !== undefined ? this.data : this

  if (typeof Set !== 'undefined' && id === undefined) {
    return Array.from(new Set(ctx))
  }

  const obj = Object.create(null)
  const arr = []
  if (id === undefined) {
    return each(ctx, v => {
      const type = typeof v
      const key = type + v
      if (!obj[key]) { 
        obj[key] = true
        arr.push(v)
      }
    })
  }
  each(ctx, v => {
    const key = v.id
    if (!obj[key]) {
      obj[key] = true
      arr.push(v)
    }
  })
  
  return arr
}



add.key = 'add'
minus.key = 'minus'
set.key = 'set'

export { add, minus, set }
