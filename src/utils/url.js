import {
  wt,
  json,
  serialize
} from '../data'
wt.use(json, serialize)
class Url {
  getPath(index) {
    return index !== undefined ?
      window.location.pathname.slice(1).split('/')[index] :
      window.location.pathname
  }

  getSearch(key) {
    const searchStr = window.location.search
    const ret = wt(searchStr).json()
    return key !== undefined ? ret[key] : ret
  }

  search(obj) {
    window.location.search = '?' + wt(obj).serialize()
  }
}

export default new Url