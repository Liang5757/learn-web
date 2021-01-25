// node.js 是异步执行代码的，server会一直接受请求而不等待读写操作
// 这样就可能会导致下一次请求拿不到本次请求的执行结果

// 方式一：callback
const fs = require('fs')
console.log(1)  // 先执行
const getText1 = (callback) => {
  fs.readFile('./test.txt', (err, data) => {
    if (err) {
      console.log(err.code)
      return
    }
    callback(data)  // 获取test.txt的内容，最后执行
  })
}
getText1((text) => {
  console.log(text.toString())
})
console.log(3)  // 在执行


// 方法二：通过事件绑定触发的方式解决异步执行流程的问题
// 引入 events 模块， Node 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件。
const events = require("events")

const EventEmitter = new events.EventEmitter()

const getText2 = () => {
  fs.readFile('./test.txt', (err, data) => {
    if (err) {
      console.log(err.code)
      return
    }
    EventEmitter.emit('data', data)  // 最后执行
  })
}

getText2();

// 监听data
EventEmitter.on('data', (text) => {
  console.log(text.toString())
})
