function serialize() {
  let ret = ''
  this.each((val, key) => {
    ret += `${key}=${val}&`
  })
  return ret.slice(0, -1)
}

export {
  serialize
}