const MyPromise = (function () {
  // 对应的三个状态
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  // 当前promise的数据
  const PromiseValue = Symbol("PromiseValue");
  // 当前promise的状态
  const PromiseStatus = Symbol("PromiseStatus");
  // 成功时要执行的回调函数列表
  const onFulfilledList = Symbol("onFulfilledList");
  // 失败时要执行的回调函数列表
  const onRejectedList = Symbol("onRejectedList");
  // 更新状态的函数
  const updateStatus = Symbol("updateStatus");
  // 把任务添加到任务队列里异步执行的函数
  const executeAsync = Symbol("executeAsync");
  // 创建串联的promise
  const createLinkPromise = Symbol("createLinkPromise");
  // 后续处理的通用函数
  const settleHandle = Symbol("settleHandle");
  // 执行then绑定的回调, 同时try catch
  const execute = Symbol("execute");
  // 默认的OnFulfilled
  const defaultOnFulfilled = function (data) { return data; };
  // 默认的OnRejected
  const defaultOnRejected = function (err) { throw new Error(err); };
  return class {
    /**
     * 异步执行回调函数
     * @param handler 回调函数
     * @param arg 传递给回调函数的参数
     */
    [executeAsync](handler, ...arg) {
      setTimeout(() => {
        handler(...arg);
      }, 0);
    }

    /**
     * 更新状态
     * @param newStatus 新的状态
     * @param newValue promise新的数据
     * @param executeQueue 要执行的回调列表
     */
    [updateStatus](newStatus, newValue, executeQueue) {
      // 如果状态不是pending, 就返回
      if (this[PromiseStatus] !== PENDING) return;
      // 把当前promise的状态改成新的状态
      this[PromiseStatus] = newStatus;
      // 把当前promise的值更新为新的值
      this[PromiseValue] = newValue;
      // 把回调列表里的函数取出来依次执行
      executeQueue.forEach(handler => {
        // 异步执行then中注册的回调
        this[executeAsync](handler, newValue);
      });
    }

    /**
     * 处理then传入的回调函数
     * @param handler 回调函数
     * @param immediatelyStatus 立即推入任务队列执行的状态
     * @param queue 如果不立即执行，保存的队列
     */
    [settleHandle](handler, immediatelyStatus, queue) {
      // 如果传入的不是一个函数就返回
      if (typeof handler !== "function") return;
      // 判断是不是立刻执行的状态
      if (this[PromiseStatus] === immediatelyStatus) {
        // 是就立刻推入异步执行队列
        this[executeAsync](handler, this[PromiseValue]);
      } else {
        // 不是就放到回调列表中
        queue.push(handler);
      }
    }

    /**
     * 执行回调，获取返回值，如果报错就执行reject
     * @param data 传给handler的数据
     * @param handler 要在try catch中执行的回调函数
     * @param resolve 下个promise的resolve
     * @param reject 下个promise的reject
     */
    [execute](data, handler, resolve, reject) {
      try {
        const result = handler(data);
        // 如果返回值是promise
        if (result instanceof MyPromise) {
          // 用then注册回调
          result.then(data => {
            // 把回调收到的数据转发给下个promise
            resolve(data);
          }, err => {
            reject(err);
          });
        } else {
          // 如果返回值不是promise，直接传递就行
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    /**
     * 用于创建then返回的新promise
     * @param onFulfilled then里传入的onFulfilled函数
     * @param onRejected then里传入的onRejected函数
     */
    [createLinkPromise](onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        // 在这里调用[settleHandle]就能处理then传入的回调了
        this[settleHandle](data => {
          this[execute](data, onFulfilled, resolve, reject);
        }, RESOLVED, this[onFulfilledList]);
        this[settleHandle](err => {
          this[execute](err, onRejected, resolve, reject);
        }, REJECTED, this[onRejectedList]);
      });
    }

    then(onFulfilled = defaultOnFulfilled, onRejected = defaultOnRejected) {
      return this[createLinkPromise](onFulfilled, onRejected);
    }

    catch(onRejected) {
      return this.then(defaultOnFulfilled, onRejected);
    }

    finally(handler) {
      return this.then(handler, handler);
    }

    constructor(executor) {
      this[PromiseStatus] = PENDING;
      this[PromiseValue] = undefined;
      this[onFulfilledList] = [];
      this[onRejectedList] = [];
      // 定义resolve函数
      const resolve = data => {
        this[updateStatus](RESOLVED, data, this[onFulfilledList]);
      };
      // 定义reject函数
      const reject = reason => {
        this[updateStatus](REJECTED, reason, this[onRejectedList]);
      };
      try {
        // 同步执行new Promise时传入的函数
        executor && executor(resolve, reject);
      } catch (e) {
        // 如果捕获到异常就调用reject
        reject(e);
      }
    }

    static all(promises) {
      // promise数组的长度
      const length = promises.length;
      // 创建用于保存结果的数组
      const resultArr = new Array(length);
      // 已经处于resolved状态的promise的个数
      let count = 0;
      return new MyPromise((resolve, reject) => {
        promises.map((promise, index) => {
          // 给每个promise都注册回调
          Promise.resolve(promise).then(data => {
            // 处于resolve状态后, 把count加1
            count++;
            // 保存数据到数组中
            resultArr[index] = data;
            // 如果全部处于resolved状态
            if (count >= length) {
              // 就把返回的promise变成resolved状态
              resolve(resultArr);
            }
          }, err => {
            // 有任一个处于rejected状态
            // 就把返回的promise置为rejected状态
            reject(err);
          });
        });
      });
    }

    static race(promises) {
      return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
          // 任意一个修改状态后就修改返回的promise的状态
          promise.then(data => {
            resolve(data);
          }, err => {
            reject(err);
          });
        });
      });
    }

    static resolve(data) {
      if (data instanceof MyPromise) return data;
      return new MyPromise(resolve => {
        resolve(data);
      });
    }

    static reject(err) {
      if (err instanceof MyPromise) return err;
      return new MyPromise((resolve, reject) => {
        reject(err);
      });
    }
  };
}());
//
// const p1 = new MyPromise(function (resolve, reject) {
//   setTimeout(() => reject(new Error('fail')), 3000)
// })
//
// const p2 = new MyPromise(function (resolve, reject) {
//   setTimeout(() => resolve(p1), 1000)
// })
//
// p2.then(result => console.log(result))
//   .catch(error => console.log(error))
// // Error: fail
//
new MyPromise((resolve, reject) => {
  resolve(1);
}).then(r => {
  console.log(r);
  return 2;
}).then(r => {
  console.log(r);
  return 3;
}).then(r => {
  console.log(r);
});
