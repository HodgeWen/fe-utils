// 队列和栈相对，遵循先进先出原则(FIFO)

class Queue {
  constructor () {
    this.items = []
  }
  // 队列尾部增加一个项
  enqueue (item) {
    this.items.push(item)
  }
  // 移除队列的第一项
  dequeue () {
    this.items.shift()
  }
  // 返回队列中的第一个元素
  front () {
    return this.items[0]
  }
  // 队列是否为空
  isEmpty () {
    return this.size() === 0
  }
  // 返回队列中元素的数量
  size () {
    return this.items.length
  }
}

export default Queue