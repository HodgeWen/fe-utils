function find(qs) {
  this.splice(0)
  this.selector = this.selector + ' ' + qs
  const nodeList = document.querySelectorAll(this.selector)
  this.push(...nodeList)
  return this
}

function eq(index) {
  const target = this[index]
  this.splice(0)
  this.push(target)
  return this
}

function not(sn) {
  
}

find.key = "find"
eq.key = "eq"
not.key = "not"

export { find, eq, not }
