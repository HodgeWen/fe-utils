import { $, wt, utils } from "../src/index"
import {BinarySearchTree} from '../src/algorithms'
// import $, { val, hasClass } from '../src/dom' 
// import wt, {json, serialize, dataReset, map, values, set, add} from '../src/data'
// import * as utils from '../src/utils'

// $.use(val, hasClass)
// wt.use(json, serialize, dataReset, map, values, set, add)

~function(ctx) {
  ctx.$ = $
  ctx.wt = wt 
  ctx.utils = utils
  ctx.BinarySearchTree = BinarySearchTree

  // ctx.arr = [
  //   {id: 0, pid: null},
  //   {id: 1, pid: 0},
  //   {id: 2, pid: 0},
  //   {id: 3, pid: 1},
  //   {id: 4, pid: 1},
  //   {id: 5, pid: 2},
  //   {id: 6, pid: 2},
  //   {id: 7, pid: 3}
  // ]

  // const tree = [
  //   {
  //     id: 0, pid: null, 
  //     children: [
  //       {
  //         id: 1, pid: 0,
  //         children: [
  //           {
  //             id: 3, pid: 1,
  //             children: [
  //               {id: 7, pid: 3}
  //             ]
  //           },
  //           {id: 4, pid: 1}
  //         ]
  //       },
  //       {
  //         id: 2, pid: 0,
  //         children: [
  //           {id: 5, pid: 2},
  //           {id: 6, pid: 2}
  //         ]
  //       }
  //     ]
  //   }
  // ]
}(window)
