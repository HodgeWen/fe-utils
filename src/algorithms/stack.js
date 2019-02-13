// 栈是一种遵从后进先出(LIFO)原则的有序集合

class Stack {
  constructor () {
    this.items = []
  }
  // 栈顶加入元素
  push (item) {
    this.items.push(item)
  }
  // 移除栈顶元素
  pop (item) {
    this.items.pop(item)
  }
  // 返回栈顶的元素
  peek () {
    return this.items[this.size() - 1]
  }
  // 当前是否为空栈 是空栈返回true 否则返回false
  isEmpty () {
    return this.items.length === 0
  }
  // 清空栈
  clear () {
    this.items = []
  }
  // 栈中元素的个数
  size () {
    return this.items.length
  }
}

export default Stack