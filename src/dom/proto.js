function each(callback) {
  for (let i = 0, len = this.length; i < len; i++) {
    callback(this[i], i)
  }
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}
export {
  each,
  getType
}