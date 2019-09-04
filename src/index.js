import $$, * as domFuns from './dom'

import wtt, * as wtFuns from './data'

import * as uutils from './utils'

wtt.use(wtFuns)

$$.use(domFuns)

export const $ = $$

export const wt = wtt

export const utils = uutils
