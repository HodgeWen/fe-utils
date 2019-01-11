const each = (arr, callback) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    callback(arr[i], i)
  }
}

const eachObj = (object, callback) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      callback(object[key], key)
    }
  }
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

export { each, eachObj, getType }
