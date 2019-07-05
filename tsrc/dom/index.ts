import { eachObj } from '../common'

class Selector {
  selector: string;

  length: number = 0;

  [index: number]: HTMLElement;

  constructor(sth: string | HTMLElement) {
    this.length = 0
    if (typeof sth === 'string') {
      this.selector = sth
      this.push.apply(this, document.querySelectorAll(sth))
    } else {
      this.push(sth)
    }
  }

  private push(...items: any[]): number {
    return Array.prototype.push.call(this, ...items)
  }

  private splice(start: number, deleteCount?: number, ...items: any[]): any[] {
    return Array.prototype.splice.call(this, start, deleteCount, ...items)
  }

  each (callback: (value: any, index: number) => void): void {
    let i: number = -1
    const len: number = this.length
    while (++i < len) {
      callback(this[i], i)
    }
  }
}

function $(str: string | HTMLElement) {
  return new Selector(str)
}

$.use = (funcs: {[name: string]: Function}): void => {
  eachObj(funcs, (func: Function, key: string) => Selector.prototype[key] = func)
}

export default $

export * from './selector'

export * from './class'

export * from './attribute'

export * from './element'

export * from './event'

export * from './style'
