import {$, wt, utils} from '../src'

describe('测试wt的原始功能', () => {
  
  test('获取属性', () => {
    const inst = [1, '1', true, {}, []]
    expect(inst.map(item => wt(item).type)).toEqual(['Number', 'String', 'Boolean', 'Object', 'Array'])
    expect(wt(3).type).toBe('Number')
  })

  test('遍历', () => {
    const arr = [1, 2, 3, 4, 5]
    const ret = []
    wt(arr).each(item => ret.push(item + 1))
    expect(ret).toEqual([2, 3, 4, 5, 6])
    
  })
})

