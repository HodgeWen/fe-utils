export function isArr() {
  return this.type === "Array"
}

export function isObj() {
  return this.type === "Object"
}

export function isFunc() {
  return this.type === "export Function"
}

export function isStr() {
  return this.type === "String"
}

export function isNum() {
  return this.type === "Number"
}

export function isBoo() {
  return this.type === "Boolean"
}
