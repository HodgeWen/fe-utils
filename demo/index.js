import { 
  $, hasClass, addClass, removeClass, attr,
  on, off, find, append, css, prop, setNode
} from '../src/index'

$.use(
  hasClass, addClass, removeClass, attr,
  on, off, find, append, css, prop, setNode
)

window.$ = $