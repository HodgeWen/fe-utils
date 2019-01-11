function find(qs) {
  return this[0].querySelectorAll(qs)
}

function eq(index) {
  const target = this[index]
  this.splice(0)
  this.push(target)
  return this
}

export { find, eq }
