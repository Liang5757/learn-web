// T中剔除K中存在的
type Diff<T, K> = T extends K ? never : T;
type R1 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type test = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"，内置函数

// T中找到K中存在的
type Filter<T, K> = T extends K ? T : never;
type R2 = Filter<string | number | (() => void), Function>; // () => void

// 找到只有一个参数的函数参数类型
type ParamType<T> = T extends (param: infer P) => any ? P : T;
type R3 = ParamType<(para: string) => void>; // string

// tuple 转 union 如: [string, number] -> string | number
type ElementOf<T> = T extends Array<infer E> ? E : never;
type R4 = ElementOf<[string, number]>; // string | number

type TTuple = [string, number];
type R5 = TTuple[number]; // string | number

// union 转 intersection 如: string | number -> string & number (PS: 利用函数参数的逆变)
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
interface test1 {} interface test2 {}
type R6 = UnionToIntersection<test1 | test2>; // test1 & test2

// LastInUnion<1 | 2> = 2
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
  > extends (x: infer L) => 0
  ? L
  : never;

// union 转 数组, UnionToTuple<1 | 2> = [1, 2]
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

// 深度可选
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Object
    ? DeepPartial<T[K]>
    : T[K]
}
type R7 = DeepPartial<{
  id: number
  name: string
  address: string
  company: {
    id: number
    name: string
    address: string
  }
}>

// 合并类型
type Compute<A extends any> = A extends Function
  ? A
  : { [K in keyof A]: A[K] }
type R8 = Compute<{x: 'x'} & {y: 'y'}> // {x: "x", y: "y"}
type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>

// 取T和K的交集
type Intersection<T, K> = { [U in keyof T & keyof K]: T[U] }
type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };
type DuplicatedProps = Intersection<Props, DefaultProps>;

// 用U的属性覆盖T的相同属性
// 方式一
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
  > = Pick<I, keyof I>;
// 方式二
// type Overwrite<T, K> = { [U in keyof T]: U extends keyof K ? K[U] : T[U] };
type Props2 = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };
type ReplacedProps = Overwrite<Props2, NewProps> // { name: string; age: string; visible: boolean; }

// 将所有属性的readonly给移除
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
