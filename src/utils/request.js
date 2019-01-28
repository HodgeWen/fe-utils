import Pro from './promise'
import { merge } from '../data/object.js'

const tactics = {
  json: 'application/json'
}
function request ({
  url = '',
  data = {},
  headers = {},
  dataType = 'json',
  method = 'get'
} = {}) {
  if (self.fetch) {
    const init = {
      body: method.toUpperCase() === 'GET' || method.toUpperCase() === 'HEAD' ? null : JSON.stringify(data),
      method: method.toUpperCase(),
      headers: merge.call(headers, {
        'Content-Type': tactics[dataType]
      }),
      // cache: 'no-cache',
      // credentials: 'include',
      // mode: 'no-cors',
      // redirect: 'follow',
      // referrer: 'no-referrer'
    }
    return fetch(url, init).then(res => res.json())
  }
}

request.key = 'request'

export default request