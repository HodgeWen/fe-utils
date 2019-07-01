import { eachObj } from '../common'

class Selector extends Array {
  selector: string;

  length: number = 0;

  constructor(sth: string | Object) {
    super()
    this.length = 0
    if (typeof sth === 'string') {
      this.selector = sth
      this.push.apply(this, document.querySelectorAll(sth))
    } else {
      this.push(sth)
    }
  }

  each (callback: (value: any, index: number) => void): void {
    let i: number = -1
    const len: number = this.length
    while (++i < len) {
      callback(this[i], i)
    }
  }

  push = Array.prototype.push
}

// function Selector(str: string) {
//   this.length = 0
//   if (typeof str === 'string') {
//     this.selector = str
//     const nodeList = document.querySelectorAll(str)
//     this.push.apply(this, nodeList)
//   } else {
//     this.push(str)
//   }
// }

const pt = Selector.prototype

const ap = Array.prototype

// pt.constructor = Selector
pt.push = ap.push
pt.splice = ap.splice
// pt.each = function (callback: (value: any, index: number) => void):void {
//   let i = -1
//   const len = this.length
//   while (++i < len) {
//     callback(this[i], i)
//   }
// }

pt.env = (function () {
  const ua = navigator.userAgent.toLowerCase()
  const isLtIe11 = ua.match(/msie\s[\d\.]+/)
  const isGtIe10 = isLtIe11 && +isLtIe11[0].split(' ')[1] >= 10
  return !isLtIe11 || isGtIe10
})()

function $(str: string) {
  return new Selector(str)
}

$.use = (funcs: Function) => eachObj(funcs, (func, key) => pt[key] = func)

export default $

export * from './selector'

export * from './class'

export * from './attribute'

export * from './element'

export * from './event'

export * from './style'
// export { find, eq, not } from './selector'

// export { hasClass, addClass, removeClass, toggleClass } from './class'

// export { attr, prop, val, html, text } from './attribute'

// export { append } from './element'

// export {
//   on,
//   off,
//   click,
//   mouseenter,
//   mouseleave,
//   mousedown,
//   mousemove,
//   mouseup,
//   scroll,
//   resize,
//   keyup,
//   keydown,
//   change
// } from './event'

// export { css } from './style'
