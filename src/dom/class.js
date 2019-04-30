function _has (node, className) {
  return node.className.indexOf(className !== -1)
}

function _add (node, className) {
  if (!_has(node, className)) {
    node.className = node.className.trim() + ' ' + className
  }
}

function _remove (node, className) {
  if (_has(node, className)) {
    node.className = node.className.replace(className, '').replace(/\s+/, ' ').trim()
  }
}

export function hasClass(className) {
	return this.env ? this[0].classList.contains(className) : _has(this[0], className)
}

export function addClass(className) {
	if (!this.env) {
		this.each((node) => _add(node, className))
	} else {
    this.each((node) => node.classList.add(className))
  }
	return this
}

export function removeClass(className) {
	if (!this.env) {
		this.each((node) => _remove(node, className))
	} else {
    this.each((node) => node.classList.remove(className))
  }
	return this
}

export function toggleClass(className) {
  if (!this.env) {
    this.each(node => {
      _has(node, className) ? _remove(node, className) : _add(node, className)
    })
  } else {
    this.each((node) => node.classList.toggle(className))
  }
  return this
}
