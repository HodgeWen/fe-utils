import { 
  $, hasClass, addClass, removeClass, attr,
  on, off, find 
} from '../src/index'

$.use(
  hasClass, addClass, removeClass, attr,
  on, off, find 
)

window.$ = $