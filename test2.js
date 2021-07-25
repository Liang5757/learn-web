class Parent {
  constructor (name = "Parent") {
    this.name = "Parent";
    this.rua = "qaq"
  }
  
  getName() {
    return this.name;
  }
  
  getRua() {
    return this.rua;
  }
}

class Child extends Parent {
  constructor (name = "Child", age = 16) {
    super();
    this.name = name;
    this.age = age;
  }
  
  getName() {
    return this.name;
  }
  
  getSuperName() {
    return super.getName();
  }
}


let child = new Child();
