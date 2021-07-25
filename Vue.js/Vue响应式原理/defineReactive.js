class Dep {
  constructor () {
    this.deps = []
  }
  
  addSub (dep) {
    this.deps.push(dep);
  }
  
  notify () {
    this.deps.forEach(function (dep) {
      dep.update();
    })
  }
}

function defineReactive (data, key, value) {
  observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      if (Dep.target) {
        //添加订阅者
        dep.addSub(Dep.target);
      }
      return value;
    },
    set (newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      dep.notify();
    }
  })
}

export function observe (obj) {
  if (!obj || typeof obj !== "object") {
    return;
  }
  
  Object.keys(obj).forEach(function (key) {
    defineReactive(obj, key, obj[key]);
  })
}

export class Watcher {
  constructor (vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }
  
  update () {
    this.run();
  }
  
  run () {
    let value = this.vm.data[this.exp];
    let oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
  
  get () {
    Dep.target = this;
    let value = this.vm.data[this.exp]; // 触发添加订阅者
    Dep.target = null;
    return value;
  }
}
