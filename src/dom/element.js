function append(child, deep = true) {
  this.each(node => {
    node.appendChild(child.cloneNode(deep))
  })
  return this
}

append.key = 'append'

export { append }
