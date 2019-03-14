import Ps from './promise'
import { merge, serialize } from '../data/object.js'

const Pro = window.Promise || Ps // 初始化兼容
const data_tactics = {
	json: 'application/json; charset=utf-8',
	xml: 'application/x-www-form-urlencoded; charset=utf-8',
	text: 'text/plain; charset=utf-8',
  html: 'html/plain; charset=utf-8',
  form: 'multipart/form-data; charset=utf-8'
}

function createInstance (url, method, data, callback) {
	
}

// 创建一个基于XMLHttpRequest的请求客户端
function createReq ({
	url, method = 'GET', data, timeout = 18000, success = function () {},
	failed = function () {}
} = {}) {
	const client = new XMLHttpRequest()
	const reg = /^(get|head)$/i
	const isNotGetOrHead = !reg.test(method)
	const serializeData = serialize.call(data)

	if (isNotGetOrHead) {
		data = serializeData
	} else {
		url = url + '?' + serializeData
		data = null
	}

	client.onreadystatechange = function () {
		if (this.readyState !== 4) return false 	
		if (this.status >= 400 && this.status < 600 ) {
			failed(this.status, this.statusText)
		}

		success(this)
	}

	client.open(method, url, true)
	client.timeout = timeout
	client.ontimeout = function () {
		failed(this.status)
	}

	client.send(data)
}

// 
function createFetch () {
	return fetch
}

class Request {

	constructor () {
		this.baseUrl = ''
		this.timeout = 18000
	}

	request () {
		

		return new Pro((resolve, reject) => {

		})
	}

	get (url, data) {
		return this.request({
			method: 'get', url, data
		})
	}

	post (url, data) {
		return this.request({
			method: 'POST', url, data
		})
	}

	delete () {
		return this.request({
			method: 'DELETE', url, data
		})
	}

	put () {
		return this.request({
			method: 'PUT', url, data
		})
	}

	patch () {
		return this.request({
			method: 'PATCH', url, data
		})
	}
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
