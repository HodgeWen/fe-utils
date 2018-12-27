import { wt } from './utils'
function Selector(str) {
  this.length = 0
  this.selector = str
  const nodeList = document.querySelectorAll(str)
  wt(nodeList).each(node => this.push(node))
}

const pt = Selector.prototype = Object.create(null)
const ap = Array.prototype

pt.constructor = Selector
pt.push = ap.push
pt.slice = ap.slice
pt.splice = ap.splice

pt.use = function (...funcs) {
  wt(funcs).each(fn => pt[fn.name] = fn)
}

function $(str) {
  return new Selector(str)
}

function hasClass(className) {
  console.log(wt(this).type)
}

function addClass(className) {

}

function removeClass(className) {

}

function css() {

}

function attr() {

}

function append(dom) {

}

function on(type, handler) {

}

function off(type, handler) {

}

function setNode() {

}

function find(qs, dataType) {

}

export {
  $, hasClass
}