import { getType, each } from "../common"


const dateFormat = (time = new Date(), unit = "A-B-C a:b:c") => {
  let ret = ''
  const type = getType(time)
  const date = type === "Date" ? time : new Date(time)
  const set = method => {
    const value = method === 'getMonth' ? date[method]() + 1 : date[method]()
    return value > 9 ? "" + value : "0" + value
  }

  const json = {
    A: set('getFullYear'),
    B: set('getMonth'),
    C: set('getDate'),
    a: set('getHours'),
    b: set('getMinutes'),
    c: set('getSeconds')
  }
  each(unit, v => ret += json[v] ? json[v] : v)
  return ret
}

export default dateFormat
