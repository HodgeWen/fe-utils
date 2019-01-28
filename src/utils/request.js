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
  method = 'GET'
} = {}) {
  if (self.fetch) {
    const upMethod = method.toUpperCase()
    const body = upMethod === 'GET' || upMethod === 'HEAD' ? null : JSON.stringify(data)
    const init = {
      body,
      method: upMethod,
      headers: new Headers(merge.call(headers, {
        'Content-Type': tactics[dataType]
      })),
      cache: 'no-cache',
      mode: 'no-cors',
      // redirect: 'follow',
      
    }
    return fetch(url, init).then(res => res.json())
  }
}

request.key = 'request'

export default request