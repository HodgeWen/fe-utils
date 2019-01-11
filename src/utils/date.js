import { getType, each } from "../common"

const dateFormat = (time, unit = "Y-M-D h:m:s") => {
  let ret = ''
  const type = getType(time)
  const date = type === "Date" ? time : new Date(time)
  const set = num => num > 9 ? "" + num : "0" + num
  const json = {
    Y: date.getFullYear(),
    M: set(date.getMonth() + 1),
    D: set(date.getDate()),
    h: set(date.getHours()),
    m: set(date.getMinutes()),
    s: set(date.getSeconds())
  }
  each(unit, v => ret += json[v] ? json[v] : v)
  return ret
}

export default dateFormat
