let Beverage = function (param) {
  let boilWater = function () {
    console.log('把水煮沸');
  };
  let brew = param.brew || function () {
    throw new Error('必须传递 brew 方法');
  };
  let pourInCup = param.pourInCup || function () {
    throw new Error('必须传递 pourInCup 方法');
  };
  let addCondiments = param.addCondiments || function () {
    throw new Error('必须传递 addCondiments 方法');
  };
  let F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};

let Coffee = Beverage({
  brew() {
    console.log('用沸水冲泡咖啡');
  },
  pourInCup() {
    console.log('把咖啡倒进杯子');
  },
  addCondiments() {
    console.log('加糖和牛奶');
  }
});

let Tea = Beverage({
  brew() {
    console.log('用沸水浸泡茶叶');
  },
  pourInCup() {
    console.log('把茶倒进杯子');
  },
  addCondiments() {
    console.log('加柠檬');
  }
});
