function find(qs) {
  return this[0].querySelectorAll(qs)
}

function eq(index) {
  const target = this[index]
  this.splice(0)
  this.push(target)
  return this
}

function not(sn) {}

find.name = "find"
eq.name = "eq"
not.eq = "not"

export { find, eq, not }
