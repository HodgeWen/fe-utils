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

isArr.key = 'isArr'
isObj.key = 'isObj'
isFunc.key = 'isFunc'
isStr.key = 'isStr'
isNum.key = 'isNum'
isBoo.key = 'isBoo'

export { isArr, isObj, isFunc, isStr, isNum, isBoo }
