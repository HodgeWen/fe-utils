export function find(qs: string) {
  this.splice(0)
  this.selector = this.selector + ' ' + qs
  const nodeList = document.querySelectorAll(this.selector)
  this.push.apply(this, nodeList)
  return this
}

export function eq(index: number) {
  this.splice(0)
  this.push(this[index])
  return this
}

export function not(index: number) {
  this.splice(index, 1)
  return this
}
