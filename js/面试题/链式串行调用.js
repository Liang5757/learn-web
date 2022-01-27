class Man {
  constructor (name) {
    this.name = name;
    this.arr = [];
    console.log(`This is ${name}`);
    
    const executor = i => {
      if (i < this.arr.length) {
        this.arr[i]().then(value => {
          console.log(value);
          executor(i + 1);
        });
      }
    }
    
    Promise.resolve().then(()=> {
      executor(0)
    }, 0);
  }
  
  sleep(sec) {
    this.arr.push(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`Wale up after ${sec}`);
        }, sec * 1000);
      })
    })
    return this;
  }
  
  eat(food) {
    this.arr.push(() => {
      return Promise.resolve(`Eat ${food}`);
    })
    return this;
  }
  
  sleepFirst(sec) {
    this.arr.unshift(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`Wale up after ${sec}`);
        }, sec * 1000);
      })
    })
    
    return this;
  }
}



new Man("Hank").sleep(1).eat("supper").sleep(1).eat("me").sleepFirst(2);
// new Man("Hank").eat("supper").sleep(1).sleep(1).eat("me")
