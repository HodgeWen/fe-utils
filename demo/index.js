import { wt, $, utils } from "../tsrc"

~(function(ctx) {
  ctx.$ = $
  ctx.wt = wt
  ctx.utils = utils
})(window)
