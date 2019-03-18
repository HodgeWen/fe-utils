const WebSocket = require('websocket')
const socket = new WebSocket('ws://10.2.200.140:8080')

socket.onopen = function () {
  this.send('message')
}

socket.onmessage = function (e) {
  document.write('消息内容:' + e.data)
}