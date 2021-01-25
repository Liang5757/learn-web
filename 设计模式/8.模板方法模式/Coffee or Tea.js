// 创建一个抽象父类来表示泡一杯饮料的整个过程。
// 不论是 Coffee,还是 Tea,都被我们用Beverage来表示
class Beverage {
  boilWater() {
    console.log('把水煮沸');
  };

  brew() {
    throw new Error('子类必须重写 brew 方法');
  };

  pourInCup() {
    throw new Error('子类必须重写 pourInCup 方法');
  };

  addCondiments() {
    throw new Error('子类必须重写 addCondiments 方法');
  };

  init() { // 模板方法
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  };
}

// 创建Coffee类
class Coffee extends Beverage {
  brew() {
    console.log('用沸水冲泡咖啡');
  };

  pourInCup() {
    console.log('把咖啡倒进杯子');
  };

  addCondiments() {
    console.log('加糖和牛奶');
  };
}

let coffee = new Coffee();
coffee.init();

// 创建Tea类
class Tea extends Beverage {
  brew() {
    console.log('用沸水浸泡茶叶');
  };

  pourInCup() {
    console.log('把茶倒进杯子');
  };

  addCondiments() {
    console.log('加柠檬');
  };
}

let tea = new Tea();
tea.init();
