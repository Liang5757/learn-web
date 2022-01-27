// type A1 = 'x' extends 'x' ? 1 : 2; // A1 = 1
//
// type A2 = 'x' | 'y' extends 'x' ? 1 : 2; // A2 = 2
//
// type P<T> = T extends 'x' ? 1 : 2;
// type A3 = P<'x' | 'y'> // A3 = 1 | 2
//
// type P2<T> = [T] extends ['x'] ? 1 : 2;
// type A4 = P2<'x' | 'y'> // A4 = 2
//
// type A = InstanceType<typeof HTMLDivElement>
//
// const b:A = document.createElement('div');

class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(meters: number) {}
}

let a: Animal;
let s: Size;

a = s; // OK
s = a; // OK


class Dog extends Animal{
  constructor (name: string, numFeet: number, type: string) {
    super(name, numFeet);
  }
}

let c = new Dog('Dog', 2, '½ð');
let d = new Animal('Animal', 4)

// c = d;
d = c;

let f1 = (a: Animal) => {}
let f2 = (d: Dog) => {}

f1 = f2;
f2 = f1
