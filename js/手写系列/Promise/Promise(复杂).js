const MyPromise = (function () {
  // ��Ӧ������״̬
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  // ��ǰpromise������
  const PromiseValue = Symbol("PromiseValue");
  // ��ǰpromise��״̬
  const PromiseStatus = Symbol("PromiseStatus");
  // �ɹ�ʱҪִ�еĻص������б�
  const onFulfilledList = Symbol("onFulfilledList");
  // ʧ��ʱҪִ�еĻص������б�
  const onRejectedList = Symbol("onRejectedList");
  // ����״̬�ĺ���
  const updateStatus = Symbol("updateStatus");
  // ��������ӵ�����������첽ִ�еĺ���
  const executeAsync = Symbol("executeAsync");
  // ����������promise
  const createLinkPromise = Symbol("createLinkPromise");
  // ���������ͨ�ú���
  const settleHandle = Symbol("settleHandle");
  // ִ��then�󶨵Ļص�, ͬʱtry catch
  const execute = Symbol("execute");
  // Ĭ�ϵ�OnFulfilled
  const defaultOnFulfilled = function (data) { return data; };
  // Ĭ�ϵ�OnRejected
  const defaultOnRejected = function (err) { throw new Error(err); };
  return class {
    /**
     * �첽ִ�лص�����
     * @param handler �ص�����
     * @param arg ���ݸ��ص������Ĳ���
     */
    [executeAsync](handler, ...arg) {
      setTimeout(() => {
        handler(...arg);
      }, 0);
    }

    /**
     * ����״̬
     * @param newStatus �µ�״̬
     * @param newValue promise�µ�����
     * @param executeQueue Ҫִ�еĻص��б�
     */
    [updateStatus](newStatus, newValue, executeQueue) {
      // ���״̬����pending, �ͷ���
      if (this[PromiseStatus] !== PENDING) return;
      // �ѵ�ǰpromise��״̬�ĳ��µ�״̬
      this[PromiseStatus] = newStatus;
      // �ѵ�ǰpromise��ֵ����Ϊ�µ�ֵ
      this[PromiseValue] = newValue;
      // �ѻص��б���ĺ���ȡ��������ִ��
      executeQueue.forEach(handler => {
        // �첽ִ��then��ע��Ļص�
        this[executeAsync](handler, newValue);
      });
    }

    /**
     * ����then����Ļص�����
     * @param handler �ص�����
     * @param immediatelyStatus ���������������ִ�е�״̬
     * @param queue ���������ִ�У�����Ķ���
     */
    [settleHandle](handler, immediatelyStatus, queue) {
      // �������Ĳ���һ�������ͷ���
      if (typeof handler !== "function") return;
      // �ж��ǲ�������ִ�е�״̬
      if (this[PromiseStatus] === immediatelyStatus) {
        // �Ǿ����������첽ִ�ж���
        this[executeAsync](handler, this[PromiseValue]);
      } else {
        // ���Ǿͷŵ��ص��б���
        queue.push(handler);
      }
    }

    /**
     * ִ�лص�����ȡ����ֵ����������ִ��reject
     * @param data ����handler������
     * @param handler Ҫ��try catch��ִ�еĻص�����
     * @param resolve �¸�promise��resolve
     * @param reject �¸�promise��reject
     */
    [execute](data, handler, resolve, reject) {
      try {
        const result = handler(data);
        // �������ֵ��promise
        if (result instanceof MyPromise) {
          // ��thenע��ص�
          result.then(data => {
            // �ѻص��յ�������ת�����¸�promise
            resolve(data);
          }, err => {
            reject(err);
          });
        } else {
          // �������ֵ����promise��ֱ�Ӵ��ݾ���
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    /**
     * ���ڴ���then���ص���promise
     * @param onFulfilled then�ﴫ���onFulfilled����
     * @param onRejected then�ﴫ���onRejected����
     */
    [createLinkPromise](onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        // ���������[settleHandle]���ܴ���then����Ļص���
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
      // ����resolve����
      const resolve = data => {
        this[updateStatus](RESOLVED, data, this[onFulfilledList]);
      };
      // ����reject����
      const reject = reason => {
        this[updateStatus](REJECTED, reason, this[onRejectedList]);
      };
      try {
        // ͬ��ִ��new Promiseʱ����ĺ���
        executor && executor(resolve, reject);
      } catch (e) {
        // ��������쳣�͵���reject
        reject(e);
      }
    }

    static all(promises) {
      // promise����ĳ���
      const length = promises.length;
      // �������ڱ�����������
      const resultArr = new Array(length);
      // �Ѿ�����resolved״̬��promise�ĸ���
      let count = 0;
      return new MyPromise((resolve, reject) => {
        promises.map((promise, index) => {
          // ��ÿ��promise��ע��ص�
          Promise.resolve(promise).then(data => {
            // ����resolve״̬��, ��count��1
            count++;
            // �������ݵ�������
            resultArr[index] = data;
            // ���ȫ������resolved״̬
            if (count >= length) {
              // �Ͱѷ��ص�promise���resolved״̬
              resolve(resultArr);
            }
          }, err => {
            // ����һ������rejected״̬
            // �Ͱѷ��ص�promise��Ϊrejected״̬
            reject(err);
          });
        });
      });
    }

    static race(promises) {
      return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
          // ����һ���޸�״̬����޸ķ��ص�promise��״̬
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
