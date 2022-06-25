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


interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

type R = FunctionPropertyNames<Part>;

const r:R =  'updatePart';
console.log(r)
