# 前端工具库 FE utils

## 安装 install
> npm i wt-utils   
> yarn add wt-utils

## 使用 use
``` js
// all methods
import {
  $, wt, utils
} from 'wt-utils'

// 模块化导入
import $, {css, val} from 'wt-utils/src/dom'   
$.use(css, val)   

import wt, {set, values, keys} from 'wt-utils/src/data'
wt.use(set, values, keys)

import { WStore, url, date, cookie } from 'wt-utils/src/utils'
```
所有的方法都可以导出方面tree shaking，用最少的体积做事

## API
### $ 是一个轻量的前端dom操作库，10k不到的体积，能够用类似jq的方法方便地开发小型页面

### wt 是一个轻量级的数据处理库，你可以像这样调用 wt([1, 2, 3, 1, 2]).set(),也可以像这样调用方法wt([1, 2, 3, 1, 2]).pipe('set'),pipe方法可以传n个参数，每个参数为一个字符串表示已有的方法名，或者为一个回调函数，此回调函数返回一个当前对象的上下文，你可以在里面调用高阶函数。
```
import {wt} from 'wt-utils'

const json = {
  id: 1,
  id: 2,
  id: 3,
  id: 4,
  id: 1,
  id: 5
}

wt(json).pipe('values', 'set', ctx => ctx.map(v => v + 100))
// 经历的过程是这个样子的
// 先调用原型上的values方法得到[1, 2, 3, 4, 1, 5]
// 调用原型上的set方法得到[1, 2, 3, 4, 5]
// 传入一个回调函数将每个项加上100最终得到[101, 102, 103, 104, 105]
```
### 工具 utils
工具是一组工具的集合包括cookie的控制，date日期格式化，具有兼容性的promise，可以操作sessionStorage和localStorage的WStore，可以操作Url的url等
```
import { WStore, url, date, cookie } from 'wt-utils/src/utils'
const myStore = new WStore('session')
myStore.set('a', {name: '张三'})
// localstorage中存入了 'a': "{"name", "张三"}"

```



## 尝试
如有时间，请下载本项目，然后运行package.json里面的脚本自行尝试