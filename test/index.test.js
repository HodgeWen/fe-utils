import { wt, each, getType } from '../src/index'
import { $ } from '../src/index'

describe('测试wt的原始功能', () => {
  
  test('获取属性', () => {
    expect(wt(3).type).toBe('Number')
  })

  test('遍历', () => {
    const ret = wt(3).each(() => {})
    let n = 0
    each.call(3, () => n++)
    expect(ret).toBe(true)
    expect(n).toBe(3)
  })
})


describe('测试$的原始功能', () => {
  test('获取节点', () => {

  })
})

