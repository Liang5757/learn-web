// node.js为了简化操作，有var exports = module.exports
// 两者一致，那就说明，我可以使用任意一方来导出内部成员
console.log(exports === module.exports) // true

// 导出的对象近似于此种形式，exports相当于module.exports的引用
// var module = {
//   exports: {
//     foo: 'bar',
//     add: function
//   }
// }

// 所以直接给 exports 赋值，等价于覆盖了引用，不影响导出的内容
exports.a = 123
exports = {}    // 覆盖了指针，但a仍被导出
exports.foo = 'bar' // 未被导出

module.exports.b = 456 // 被导出

// 这里导致 exports !== module.exports
module.exports = {
  foo: 'bar'
}

// 但是这样又能重新建立两者的引用关系
exports = module.exports

// 最终 return 的是 module.exports
// 所以无论你 exports 中的成员是什么都没用
exports = { // 未被导出
  a: 456
}

// 因为最后return的是module.exports
// 最终得到的是 Function
module.exports = function () {
  console.log('hello')
}

// 真正去使用的时候：
//    导出多个成员：exports.xxx = xxx
//    导出多个成员也可以：module.exports = {
//                        }
//    导出单个成员：module.exports
