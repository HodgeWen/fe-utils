const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
	next()
})
app
	.route('/test')
	.get((req, res) => {
		res.send({
			code: 1,
			list: [ { id: 1, name: '张三' }, { id: 2, name: '李四' } ],
			message: '获取成功'
		})
	})
	.post((req, res) => {
		res.send({
			code: 1,
			message: '测试成功'
		})
	})
app.listen(80)
