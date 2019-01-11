// import { $, wt, utils } from "../src/index"

import wt, {serialize, json} from '../src/data'
wt.use(serialize, json)
window.wt = wt

// window.$ = $

// window.utils = utils
