class Person {
  constructor (a) {
    this.a = a;
  }
  
  method () {
    console.log('method');
  }
}

console.log(new Person(1));

class Student extends Person {
  constructor (a, b) {
    super(a);
    this.b = b;
  }
  
  method2 () {
    console.log('method2');
  }
}

console.log(new Student(1, 2));
