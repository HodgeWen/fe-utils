import {each} from '../common'

function add(...args) {
  const ctx = this.data !== undefined ? this.data : this
  return ctx.concat(args)
}

function minus(arr) {
  const ctx = this.data !== undefined ? this.data : this 
}

function set(id) {
  const ctx = this.data !== undefined ? this.data : this

  if (Array.from && id === undefined) {
    return Array.from(new Set(ctx))
  }

  const obj = Object.create(null)
  const arr = []
  if (id === undefined) {
    each(ctx, v => {
      const key = typeof v + v
      if (!obj[key]) { 
        obj[key] = true
        arr.push(v)
      }
    })
    return arr
  }
  each(ctx, v => {
    const key = v[id]
    if (!obj[key]) {
      obj[key] = true
      arr.push(v)
    }
  })
  return arr
}



function toTree (id = 'id', pid = 'pid') {
  const ctx = this.data !== undefined ? this.data : this
}

add.key = 'add'
minus.key = 'minus'
set.key = 'set'
toTree.key = 'toTree'

export { add, minus, set, toTree }
