function $ (id) {
  return document.getElementById(id)
}

export default class Drag {
  constructor ({
    track, slider, sticky = falses
  } = {}) {
    this.track = $(track)
    this.slider = $(slider)
  }

  init () {

  }

  // 移动范围 要么2个参数 要么4个参数 其他参数则报错
  move (left, right, top, end) {

  }
}