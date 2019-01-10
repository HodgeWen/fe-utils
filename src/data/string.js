function json() {
  const ret = {}
  const data = this.data
  const str = data.indexOf('?') === 0 ? data.slice(1) : data
  const couple = str.split('&')
  this.each.call(couple, v => {
    const arr = v.split('=')
    const key = arr[0]
    const val = arr[1]
    ret[key] = val
  })
  return ret
}

export {
  json
}