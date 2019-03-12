function each (arr, callback) {
  let i = -1, len = arr.length
  while (++i < len) {
    callback(arr[i], i)
  }
}

function eachObj (object, callback) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      callback(object[key], key)
    }
  }
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

function getCtx(any) {
  return any.data !== undefined ? any.data : any 
}

export { each, eachObj, getType, getCtx }
