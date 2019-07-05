
export const each = (arr: any[], callback: (value: any, index: number) => void) =>  {
  let i: number = -1, len: number = arr.length
  while (++i < len) {
    callback(arr[i], i)
  }
}

export const eachObj = (object: {
  [key: string]: any 
}, callback: (value: any, key: string) => void): void => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      callback(object[key], key)
    }
  }
}

export const getType = (data: any): string => Object.prototype.toString.call(data).slice(8, -1)

export function getCtx(context: {data?: any}): any {
  return context.data !== undefined ? context.data : context 
}
