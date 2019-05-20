interface Dwrap {
  type: string;
  data: any;
}

interface Selector {
  [index: string | number]: HTMLDocument;
  length: number;
  selector?: string;
}

declare function wt(value: any): Dwrap

declare function $(s: string): Selector

declare interface utils {
  [props: string]: any
}

export {
  wt, $, utils
}