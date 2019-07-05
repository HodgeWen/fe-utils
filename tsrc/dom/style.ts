import { getType } from "../common"

// export function css (prop: string, value: string) {
//   this.each((node: HTMLElement) => (node.style[prop] = value))
//   return this
// }

// export function css (prop: string) {
//   return window.getComputedStyle(this[0])[prop]
// }

// export function css (obj: {
//   [prop: string]: string
// }) {
//   this.each(node => {
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         node.style[key] = obj[key]
//       }
//     }
//   })
//   return this
// }

export function css(...params: any[]) {
  const param1 = params[0]
  const param2 = params[1]
  if (param2 !== undefined) {
    this.each((node: HTMLElement) => (node.style[param1] = param2))
    return this
  }
  if (getType(param1) === "String") {
    return window.getComputedStyle(this[0])[param1]
  }
  this.each((node: HTMLElement) => {
    for (const key in param1) {
      if (param1.hasOwnProperty(key)) {
        node.style[key] = param1[key]
      }
    }
  })
  return this
}
