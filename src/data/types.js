function isArr() {
  return this.type === "Array"
}

function isObj() {
  return this.type === "Object"
}

function isFunc() {
  return this.type === "Function"
}

function isStr() {
  return this.type === "String"
}

function isNum() {
  return this.type === "Number"
}

function isBoo() {
  return this.type === "Boolean"
}

export { isArr, isObj, isFunc, isStr, isNum, isBoo }
