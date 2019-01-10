import {
  wt
} from '../data'

class Url {
  getPath(index) {
    return index !== undefined ?
      window.location.pathname.slice(1).split('/')[index] :
      window.location.pathname
  }

  getSearch() {

  }

  search() {

  }
}

export default new Url