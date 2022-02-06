function logParameter(target: Object, propertyKey: string, index: number) {
  console.log(target, propertyKey, index);
}

class Person {
  greet(@logParameter message: string,@logParameter name: string): string {
    return `${message} ${name}`;
  }
}

const p = new Person();
p.greet('hello', 'xiaomuzhu');

// Person { greet: [Function] } greet 1
// Person { greet: [Function] } greet 0
