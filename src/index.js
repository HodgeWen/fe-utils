import $, * as domFuns from './dom'

import wt, * as wtFuns from './data'

import * as utils from './utils'

wt.use(wtFuns)

$.use(domFuns)

export { $, wt, utils }
