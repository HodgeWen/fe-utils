import Pro from './promise'
import { merge, serialize } from '../data/object.js'

const data_tactics = {
	json: 'application/json; charset=utf-8',
	xml: 'application/x-www-form-urlencoded; charset=utf-8',
	text: 'text/plain; charset=utf-8',
  html: 'html/plain; charset=utf-8',
  form: 'multipart/form-data; charset=utf-8'
}

function request({ 
  url = '', 
  data = {}, 
  headers = {}, 
  dataType = 'xml', 
  method = 'GET' 
} = {}) {
  method = method.toUpperCase()
	if (self.fetch) {
		const body = method === 'GET' || method === 'HEAD' ? null : JSON.stringify(data)
		const init = {
			body,
			method: method,
			headers: merge.call(headers, {
				'Content-Type': data_tactics[dataType]
			}),
			cache: 'no-cache',
			mode: 'cors',
			redirect: 'follow'
		}
		return fetch(url, init).then((res) => res.json())
	} else {
    const SelfPro = self.Promise ? self.Promise : Pro
    const promise = new SelfPro((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', function() {
        if (this.readyState !== 4) return false 
        try {
          resolve(JSON.parse(this.responseText))
        } catch (err) {
          reject(err ? err : this.responseText)
        }
      })
      xhr.open(method, method === 'POST' ? url : url + '?' + serialize.call(data), true)
      xhr.send(method === 'POST' ? serialize.call(data) : null)
    })
		return promise
	}
}

request.get = function(url, data) {
	return this({
		url,
		method: 'GET',
		data
	})
}

request.post = function(url, data) {
	return this({
		url,
		method: 'POST',
		data
	})
}

request.key = 'request'

export default request
