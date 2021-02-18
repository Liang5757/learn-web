class Dep {
  constructor() {
    this.subs = []
  };
  
  depend() {
    if (activeUpdate) {
      this.subs.push(activeUpdate);
    }
  }
  
  notify() {
    this.subs.forEach(sub => sub());
  }
}

export class Observer {
  constructor(obj) {
    this.dep = new Dep();
    this.walk(obj);
  }
  
  walk(obj) {
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key);
    })
  }
  
  defineReactive(obj, key) {
    let that = this;
    let internalValue = obj[key];
    Object.defineProperty(obj, key, {
      enumerable: false,
      configurable: false,
      get() {
        that.dep.depend();
        return internalValue;
      },
      set(newVal) {
        const isChanged = internalValue !== newVal;
        if (isChanged) {
          internalValue = newVal;
          that.dep.notify();
        }
      }
    })
  }
}

let activeUpdate = null;

export function autoRun (update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate // 把wrappedUpdate存起来
    update() // 在update内部调用dep.depend()收集依赖
    activeUpdate = null
  }
  wrappedUpdate()
}