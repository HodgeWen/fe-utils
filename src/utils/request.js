import Pro from './promise'
import { merge } from '../data/object.js'
import {getType} from '../common/index.js'
const tactics = {
  json: 'application/json; charset=UTF-8'
}

function request ({
  url = '',
  data = {},
  headers = {},
  dataType = '',
  method = 'GET'
} = {}) {
  if (self.fetch) {
    const upMethod = method.toUpperCase() 
    const body = upMethod === 'GET' || upMethod === 'HEAD' ? null : JSON.stringify(data)
    const init = {
      body,
      method: upMethod,
      headers: merge.call(headers, {
        'Content-Type': tactics[dataType]
      }),
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
    }
    return fetch(url, init).then(res => res.json())
  }
}

request.key = 'request'

export default request