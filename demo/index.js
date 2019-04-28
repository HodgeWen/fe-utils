import {wt, $, utils} from "../src"

// import $, { val, hasClass } from '../src/dom' 
// import wt, {json, serialize, dataReset, map, values, set, add} from '../src/data'
// import * as utils from '../src/utils'

// $.use(val, hasClass)
// wt.use(json, serialize, dataReset, map, values, set, add)

~function(ctx) {
  ctx.$ = $
  ctx.wt = wt 
  ctx.utils = utils

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

  const canvas = $('#cvs')[0]
  const context = canvas.getContext('2d')
  canvas.width = 400
  canvas.height = 400
  $('#upload').change(function(e) {
    const file = e.target.files[0]
    const img = new Image()
    img.src = URL.createObjectURL(file)
   
   
    img.onload = function () {
      console.dir(canvas)
      context.drawImage(img, 0, 0, 400, 400)
    }
   
  })
}(window)
