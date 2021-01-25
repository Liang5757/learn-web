import { foo, bar } from '../simpleDemo/liang'

beforeAll(() => {
  console.log("我是在外面的beforeAll")
})

beforeEach(() => {
  console.log("我是在外面的beforeEach")
})

describe('describe inner', () => {
  beforeAll(() => {
    console.log("我是在里面的beforeAll")
  })

  test('foo方法-5000', () => {
    // toBe ~= ===
    expect(foo(5000)).toBe('难受')
  })

  test('bar方法-2000', () => {
    expect(bar(2000)).toBe('吃大餐')
  })
})
