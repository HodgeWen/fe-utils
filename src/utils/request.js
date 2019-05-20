import { serialize } from '../data'
import { each, eachObj, getType } from '../common'

// function reqFetch({
//   url = '',
//   method = 'get',
//   data = {},
//   timeout = 18000,
//   withCredentials = false,
//   headers = {}
// } = {}) {
//   return fetch(url, {
//     body: data,
//     method,
//     headers,
//     cache: 'no-cache',
//     mode: 'cors',
//     redirect: 'follow'
//   }).then(res => res.json())
// }

function reqXhr({
  url = '',
  method = 'get',
  data = {},
  timeout = 18000,
  withCredentials = false,
  headers = {}
} = {}) {
  this.beforeRequest(data)
  // 进行一些初始化工作
  const xhr = new XMLHttpRequest() // xhr对象
  method = method.toUpperCase() // 方法转为大写
  const isHeadOrGet = method === 'HEAD' || method === 'GET' // 是否是GET或POST请求
  url = this.baseUrl + (isHeadOrGet ? `${url}?${serialize.call(data)}` : url) // url最终的形态
  data = isHeadOrGet ? null : data // data的最终形态
  getType(data) === 'FormData' && delete headers['Content-Type']

  return new Promise((resolve, reject) => {
    xhr.open(method, url, true)
    xhr.timeout = timeout || this.timeout
    xhr.withCredentials = withCredentials || this.withCredentials
    eachObj(headers || this.headers, (val, key) => {
      xhr.setRequestHeader(key, val)
    })

    const afterResponse = this.afterResponse
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return false
      afterResponse()
      if (this.status >= 400 && this.status < 600) {
        return reject(this.status + ': ' + this.statusText)
      }

      if (this.status >= 200 && this.status < 299) {
        try {
          return resolve(JSON.parse(this.response))
        } catch (error) {
          return reject('返回值与预期不符')
        }
      }
    }

    xhr.ontimeout = function() {
      reject('请求超时')
    }

    // string | Document | Blob | ArrayBufferView | FormData | URLSearchParams | ReadableStream<Uint8Array>
    xhr.send(data)
  })
}

class Guild {
  constructor({
    baseUrl = '',
    timeout = 0,
    beforeRequest = () => {},
    afterResponse = () => {},
    headers = {},
    withCredentials = false
  } = {}) {
    this.baseUrl = baseUrl
    this.timeout = timeout || 18000
    this.beforeRequest = beforeRequest
    this.afterResponse = afterResponse
    this.headers = headers
    this.withCredentials = withCredentials
  }
}

Guild.prototype.request = reqXhr //!fetch ? reqFetch : reqXhr

each(['get', 'post', 'delete', 'patch', 'put'], key => {
  Guild.prototype[key] = function(url, data) {
    return this.request({ url, method: key, data })
  }
})

const defaultInstance = new Guild()

const guild = options => {
  return defaultInstance.request(options)
}

guild.create = config => {
  return new Guild(config)
}

guild.default = defaultInstance

each(['get', 'post', 'delete', 'patch', 'put'], key => {
  guild[key] = (url, data) => defaultInstance[key](url, data)
})

export default guild
