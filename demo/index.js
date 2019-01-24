// import { $, wt, utils } from "../src/index"

import $, { val, hasClass } from '../src/dom'
import wt from '../src/data'
import utils from '../src/utils'

$.use(val, hasClass)

window.wt = wt

window.$ = $

window.utils = utils
