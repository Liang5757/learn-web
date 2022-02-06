function addAge (constructor: Function) {
  constructor.prototype.age = 18;
}

@addAge
class Person {
  name: string;
  age!: number;
  
  constructor () {
    this.name = 'xiaomuzhu';
  }
}

let person = new Person();

console.log(person)
console.log(person.age); // 18

export {};

