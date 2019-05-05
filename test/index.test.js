import { $, wt, utils } from '../src'

describe('测试wt的原始功能', () => {
  test('获取属性', () => {
    const inst = [1, '1', true, {}, []]
    expect(inst.map(item => wt(item).type)).toEqual([
      'Number',
      'String',
      'Boolean',
      'Object',
      'Array'
    ])
  })

  test('遍历', () => {
    const arr = [1, 2, 3, 4, 5]
    const ret = []
    wt(arr).each(item => ret.push(item + 1))
    expect(ret).toEqual([2, 3, 4, 5, 6])
  })
})

describe('数组相关方法', () => {
  test('add', () => {
    const arr = [1, 2]
    expect(wt(arr).add(1, 2, [3, 4])).toEqual([1, 2, 1, 2, 3, 4])
  })

  test('set', () => {
    const arr1 = [1, 1, 1, 2, 2, 3, 3, 3, 3]
    const arr2 = [{ id: 1, name: '张三' }, { id: 1, name: '李四' }]
    expect(wt(arr1).set()).toEqual([1, 2, 3])
    expect(wt(arr2).set('id')).toEqual([{ id: 1, name: '张三' }])
    expect(wt(arr2).set('name')).toEqual([{ id: 1, name: '张三' }, { id: 1, name: '李四' }])
  })
})

describe('通用', () => {
  test('map 数组和字符串映射', () => {
    const str = '12345'
    const arr = [1, 2, 3, 4, 5]
    const retStr = wt(str).map(v => v - 1)
    const retArr = wt(arr).map(v => v - 1)
    expect(retStr).toBe('01234')
    expect(retArr).toEqual([0, 1, 2, 3, 4])
  })

  test('copy 拷贝', () => {
    const arr = [1],
      obj = { a: 1 }
    const ret1 = wt(arr).copy()
    const ret2 = wt(obj).copy()
    expect(ret1 === arr).toBeFalsy()
    expect(ret2 === obj).toBeFalsy()
    expect(ret1).toEqual(arr)
    expect(ret2).toEqual(obj)
    expect(wt(1).copy()).toBe(1)
  })
})

describe('对象处理', () => {
  const obj = {
    id: 1,
    name: '张三',
    age: 12,
    web: 'http://www.test.com',
    images: ['xxxxx', 'xxxxx1', 'xxxxx2'],
    father: {
      name: '张二'
    }
  }

  test('serialize 序列化', () => {
    const ret = wt(obj).serialize()
    const ret2 = wt(obj).serialize('*')
    expect(ret).toBe =
      'id=1&name=%E5%BC%A0%E4%B8%89&age=12&web=http%3A%2F%2Fwww.test.com&images=%5B%22xxxxx%22%2C%22xxxxx1%22%2C%22xxxxx2%22%5D&father=%7B%22name%22%3A%22%E5%BC%A0%E4%BA%8C%22%7D'
    expect(ret2).toBe =
      'id=1*name=%E5%BC%A0%E4%B8%89*age=12*web=http%3A%2F%2Fwww.test.com*images=%5B%22xxxxx%22%2C%22xxxxx1%22%2C%22xxxxx2%22%5D*father=%7B%22name%22%3A%22%E5%BC%A0%E4%BA%8C%22%7D'
  })

  test('dataReset 内容重置', () => {
    expect(wt(obj).dataReset()).toEqual({
      id: 0,
      name: '',
      age: 0,
      web: '',
      images: [],
      father: {}
    })
  })

  test('keys 获取键名', () => {
    const arr = [1, 2, 3]
    const ret = wt(obj).keys()
    const ret1 = wt(arr).keys()
    expect(ret).toEqual(['id', 'name', 'age', 'web', 'images', 'father'])
    expect(ret1).toEqual(['0', '1', '2'])
  })

  test('values 获取对象值', () => {
    const ret = wt(obj).values()
    expect(ret).toEqual([
      1,
      '张三',
      12,
      'http://www.test.com',
      ['xxxxx', 'xxxxx1', 'xxxxx2'],
      {
        name: '张二'
      }
    ])
  })

  test('merge 对象合并', () => {
    const ret = wt(obj).merge({
      id: 2,
      height: 175
    })

    expect(ret).toEqual({
      id: 1,
      name: '张三',
      age: 12,
      web: 'http://www.test.com',
      images: ['xxxxx', 'xxxxx1', 'xxxxx2'],
      father: {
        name: '张二'
      },
      height: 175
    })
  })

  test('from 对象属性覆盖', () => {
    const origin = {
      name: '',
      id: 0,
      age: 0
    }

    const ret = wt(origin).from(obj)

    expect(ret).toEqual({
      name: '张三',
      id: 1,
      age: 12
    })
  })
})

describe('字符串处理', () => {
  const str1 =
    'id=1&name=%E5%BC%A0%E4%B8%89&age=12&web=http%3A%2F%2Fwww.test.com&images=%5B%22xxxxx%22%2C%22xxxxx1%22%2C%22xxxxx2%22%5D&father=%7B%22name%22%3A%22%E5%BC%A0%E4%BA%8C%22%7D'
  const str2 =
    'id=1*name=%E5%BC%A0%E4%B8%89*age=12*web=http%3A%2F%2Fwww.test.com*images=%5B%22xxxxx%22%2C%22xxxxx1%22%2C%22xxxxx2%22%5D*father=%7B%22name%22%3A%22%E5%BC%A0%E4%BA%8C%22%7D'

  test('json 解析为对象', () => {
    const ret1 = wt(str1).json()
    const ret2 = wt(str2).json('*')
    expect(ret1).toEqual(ret2)
  })

  test('repeat 字符串重复', () => {
    const ret1 = wt('1').repeat(10)
    const ret2 = wt('12').repeat(3)
    const ret3 = wt('12').repeat(3, '-')
    expect(ret1).toBe('1111111111')
    expect(ret2).toBe('121212')
    expect(ret3).toBe('12-12-12')
  })

  test('replace 字符串指定位置子串替换 前闭后开', () => {
    const ret1 = wt('abcde').replace(0, 'a')
    const ret2 = wt('abcde').replace(3, 'a')
    const ret3 = wt('abcde').replace([1, 2], 'a')

    expect(ret1).toBe('aaaaa')
    expect(ret2).toBe('abcaa')
    expect(ret3).toBe('aacde')
  })
})

describe('数据类型判断', () => {
  const arr = [1, 2, 3],
    obj = { a: 1, b: 2 },
    num = 1,
    str = '1',
    boo = true,
    fun = function() {}
  test('获取数据类型', () => {
    const ret = wt([arr, obj, num, str, boo, fun]).map(v => wt(v).type)
    expect(ret).toEqual(['Array', 'Object', 'Number', 'String', 'Boolean', 'Function'])
  })

  test('isArr 是否为数组', () => {
    expect(wt(arr).isArr()).toBeTruthy()
  })

  test('isObj 是否为对象', () => {
    expect(wt(obj).isObj()).toBeTruthy()
  })

  test('isFunc 是否为函数', () => {
    expect(wt(fun).isFunc()).toBeTruthy()
  })

  test('isStr 是否为字符串', () => {
    expect(wt(str).isStr()).toBeTruthy()
  })

  test('isNum 是否为数字', () => {
    expect(wt(num).isNum()).toBeTruthy()
  })

  test('isBoo 是否为布尔值', () => {
    expect(wt(boo).isBoo()).toBeTruthy()
  })
})
