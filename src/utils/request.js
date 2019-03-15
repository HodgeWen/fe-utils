import Ps from './promise'
import { merge, serialize } from '../data'
import { each, eachObj, getType } from '../common'
const Pro = window.Promise || Ps 	// Promise兼容性初始化 

// 创建一个请求客户端
function createClient (Constructor, configs) {
	const instance = new Constructor(configs) 											// 创建一个实例
	const proto = Constructor.prototype

	function request (options) {
		return proto.request.call(instance, options)
	}

	function requestAddAttr (methods) {
		each(methods, method => request[method] = function (url, data) {
			return proto.request.call(instance, {
				url, method, data
			})
		})
	}

	requestAddAttr(['get', 'post', 'put', 'delete', 'patch'])

	request.key = 'request'
	return request
}

// 基于 XMLHttpRequest 的请求函数
function requestClient (iface) {


	const {
		url, method, data = {}, timeout,
		responseType, headers, success, failed
	} = iface

	function readyStateChangeHandler () {
		if (this.readyState !== 4) return false 	

		if (this.status >= 400 && this.status < 600 ) {
			return failed(this.status + ': ' + this.statusText)
		}
		
		if (this.status >= 200 && this.status < 299) {
			try {
				return success(JSON.parse(this.response))
			} catch (error) {
				return failed('返回值与预期不符')
			}
		}
	}

	function timeoutHandler () {
		return failed('请求超时')
	}

	const client = new XMLHttpRequest()
	// 开启信道
	client.open(method, url, true)
	client.timeout = timeout 	// 设置超时时间
	client.responseType = responseType // 期望的返回值

	// 监听xhr状态
	client.addEventListener('readystatechange', readyStateChangeHandler, false)
	// 超时回调
	client.addEventListener('timeout', timeoutHandler)

	// 发送头部信息
	eachObj(headers, (val, key) => {
		client.setRequestHeader(key, val)
	})
	client.send(data)
}

class Request {

	// 构造函数实例提供了所有的默认属性和默认方法
	constructor ({
		baseUrl = '',
		timeout,
		beforeSend,
		headers = {},
		responseType = 'text'
	} = {}) {
		this.baseUrl = baseUrl 				// 基础Url 
		this.timeout = timeout				// 超时时间
		this.beforeSend = beforeSend	// 发送之前
		this.headers = headers 				// 默认发送的头部文件
		this.responseType = responseType // 期望的返回值
	}

	// 发起request请求时，先查看实例里面有没有对应的实例属性
	// 实例可设置的属性有 baseUrl, timeout, beforeSend
	request ({
		url, method = 'GET', data = {}, headers, timeout,
		beforeSend, dataType, responseType
	} = {}) {
		const ret = this.getDataAndUrl(method, this.baseUrl + url, data, dataType) // 一个含有data url header的对象
		url = ret.url
		data = ret.data
		headers = merge.call(ret.headers, headers ? headers : {}, this.headers)
		beforeSend = beforeSend || this.beforeSend || function (next) { next() }
		timeout = timeout || this.timeout || 18000
		responseType = responseType || this.responseType || 'text'
		let canContinue = false
		beforeSend(() => canContinue = true )

		if (!canContinue) return new Pro((resolve, reject) => reject('请求已被拦截'))

		if (this._hasFetchApi) {																	// 如果存在fetch api则直接使用fetch api 发起请求				
			return fetch(url, {
				body: data, method, headers, cache: 'no-cache',
				mode: 'cors', redirect: 'follow'
			}).then(res => res.json())
		}
		
		return new Pro((resolve, reject) => {
			requestClient({
				url, method, data, timeout,
				failed (err) { return reject(err) },
				success (res) { return resolve(res) },
				responseType, headers
			})
		})
	}

	getDataAndUrl (method, url, data, dataType) {
		const isHeadOrGet = this._isHeadOrGetReg.test(method)
		const headers = {}
		// 判断值类型
		if (!dataType) {
			const type = getType(data)
			if (type === 'String') {
				dataType = 'text'
			} else if (type === 'Object') {
				dataType = 'def'
			} else if (type === 'FormData') {
				dataType = 'form'
			} else {
				dataType = 'def'
			}
		}
		
		// 如果是 get 或者 head 方法请求
		if (isHeadOrGet) {
			const serializeData = serialize.call(data)
			url = url + (serializeData ? '?' + serializeData : '')
			data = null
			headers['Content-Type'] = this._dataTypeTable['def']
			return {
				url, data, headers
			}
		}

		if (dataType === 'def') {
			data = serialize.call(data)
			headers['Content-Type'] = this._dataTypeTable['def']
		} else if (dataType === 'json') {
			data = typeof data === 'object' ? JSON.stringify(data) : null
			headers['Content-Type'] = this._dataTypeTable['json']
		} else {
			headers['Content-Type'] = this._dataTypeTable[dataType]
		}

		return {
			url, data, headers
		}
	}
}

Request.prototype._hasFetchApi = window.fetch ? false : false 	// 判断当前环境是否有fetch方法
Request.prototype._isHeadOrGetReg = /^(get|head)$/i  					// 判断请求方法是否是head或者get
Request.prototype._dataTypeTable = {
	json: 'application/json; charset=utf-8',
	def: 'application/x-www-form-urlencoded; charset=utf-8',
	text: 'text/plain; charset=utf-8',
  html: 'html/plain; charset=utf-8',
  form: 'multipart/form-data; charset=utf-8'
}

const request = createClient(Request) // 使用默认值

request.create = function (configs) {
	return createClient(Request, configs)
}

export default request
