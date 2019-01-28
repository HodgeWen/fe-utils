import { $, wt, utils } from "../src/index"

// import $, { val, hasClass } from '../src/dom' 
// import wt, {json, serialize, dataReset, map, values, set, add} from '../src/data'
// import * as utils from '../src/utils'

// $.use(val, hasClass)
// wt.use(json, serialize, dataReset, map, values, set, add)

~function(ctx) {
  ctx.$ = $
  ctx.wt = wt 
  ctx.utils = utils
}(window)
