const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const reject = value => {
      this.changeState(REJECTED, value, this.rejectedCallbacks);
    };

    const resolve = value => {
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      this.changeState(RESOLVED, value, this.resolvedCallbacks);
    };

    executor(resolve, reject);
  }

  changeState(newState, value, callbackList) {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = newState;
        this.value = value;
        // resolve���潫���гɹ��Ļص��ó���ִ��
        callbackList.forEach(callback => {
          callback(this.value);
        });
      }
    }, 0);
  }

  linkPromise(onFulfilled, onRejected) {
    const that = this;
    if (that.state === RESOLVED) {
      return new MyPromise((resolve, reject) => {
        try {
          onFulfilled(that.value);
        } catch (error) {
          reject(error);
        }
      });
    }

    if (that.state === REJECTED) {
      return new MyPromise((resolve, reject) => {
        try {
          onRejected(that.value);
        } catch (error) {
          reject(error);
        }
      });
    }

    // �������PENDING״̬��Ҳ����ֱ�ӱ���ص������ˣ���Ҫ��һ�����������
    if (that.state === PENDING) {
      return new MyPromise((resolve, reject) => {
        that.resolvedCallbacks.push(() => {
          try {
            onFulfilled(that.value);
          } catch (error) {
            reject(error);
          }
        });
        that.rejectedCallbacks.push(() => {
          try {
            onRejected(that.value);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onRejected = typeof onRejected === "function" ? onRejected : r => {
      throw r;
    };

    return this.linkPromise(onFulfilled, onRejected);
  }

  catch(onRejected) {
    onRejected = typeof onRejected === "function" ? onRejected : r => {
      throw r;
    };
    return this.linkPromise(undefined, onRejected);
  }
}

new Promise((resolve, reject) => {
  reject(1);
}).then(r => {
  console.log(r);
  return 2;
}).then(r => {
  console.log(r);
  return 3;
}).then(r => {
  console.log(r);
})
  .catch(err => {
    console.log("err:", err);
  });
