import { foo, bar } from './liang'

test('foo方法-5000', () => {
  // toBe ~= ===
  expect(foo(5000)).toBe('难受')
})

test('bar方法-2000', () => {
  expect(bar(2000)).toBe('吃大餐')
})
