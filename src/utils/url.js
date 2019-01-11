import { json, serialize } from "../data"

class Url {
  getPath(index) {
    return index !== undefined
      ? window.location.pathname.slice(1).split("/")[index]
      : window.location.pathname
  }

  getSearch(key) {
    const searchStr = window.location.search
    const ret = json.call(searchStr)
    return key !== undefined ? ret[key] : ret
  }

  search(obj) {
    window.location.search = "?" + serialize.call(obj)
  }
}

export default new Url()
