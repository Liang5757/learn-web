// 打印构造函数
function logClass (target: typeof Person) {
  console.log(target)
}

// 打印属性名
function logProperty (target: any, propertyKey: string) {
  console.log(propertyKey);
}

// 打印方法名
function logMethod (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(propertyKey);
}

// 打印参数位置
function logParameter (target: Object, propertyKey: string, index: number) {
  console.log(index);
}

function log (this: unknown, ...args: any) {
  switch (args.length) {
    case 1:
      return logClass.apply(this, args);
    case 2:
      return logProperty.apply(this, args);
    case 3:
      if (typeof args[2] === "number") {
        return logParameter.apply(this, args);
      }
      return logMethod.apply(this, args);
    default:
      throw new Error("Decorators are not valid here!");
  }
}

@log
class Person {
  
  @log
  public name: string;
  
  constructor (name: string) {
    this.name = name;
  }
  
  @log
  public greet (@logParameter message: string): string {
    return `${this.name} say: ${message}`;
  }
}

// 装饰器的执行顺序
// 由上至下依次对装饰器表达式求值
// 求值的结果会被当作函数，由下至上依次调用

// 类中不同声明上的装饰器将按以下规定的顺序应用：
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员
// 参数装饰器应用到构造函数
// 类装饰器应用到类

export {};
