// 订阅者回调函数
interface Observers {
  [event: string]: Array<Function>
}

// 发布者
let publisher = {
  observers: <Observers>{}, // 存放订阅者回调函数
  // 增加订阅者
  add(event, fn) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(fn); // 添加订阅者到缓存列表
  },
  // 移除订阅者
  remove(event, fn) {
    let fns = this.observers[event];

    if (!fns) { // 如果该事件没有订阅者，则返回
      return false;
    }
    if (!fn) { // 如果没有传入订阅者回调函数，则表示取消该事件的所有订阅者
      fns && (fns.length = 0);
    } else {
      for (let l = fns.length - 1; l >= 0; l--) {
        if (fns[l] === fn) {
          fns.splice(l, 1);
        }
      }
    }
  },
  // 发布消息，通知所有订阅者
  trigger(event, ...args) {
    let fns = this.observers[event];

    if (!fns || fns.length === 0) { // 如果没有订阅者，返回false
      return false;
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, args); // 触发订阅者回调函数
    }
  },
}

let installEvent = function(obj) {
  for (let i in publisher) {
    obj[i] = publisher[i];
  }
}

let salesOffices: any = {};
installEvent(salesOffices);

salesOffices.add('squareMeter88', function(price) {
  console.log('小美')
  console.log('价格=' + price);
})

salesOffices.add('squareMeter100', function (price) {
  console.log('小明')
  console.log('价格=' + price);
})

salesOffices.trigger('squareMeter88', 20000);
salesOffices.trigger('squareMeter100', 30000);
