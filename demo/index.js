import { wt, $, utils } from "../dist/utils.prod"

~(function(ctx) {
  ctx.$ = $
  ctx.wt = wt
  ctx.utils = utils
})(window)
