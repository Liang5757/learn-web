import { Sub } from "./加减乘除";

type Tail<N> = N extends [infer F, ...infer Tail] ? Tail : []
type ArrToUnion<T extends any[]> = T[number] // [1, 2, 3] => 1 | 2 | 3

type TwoSum<N extends number[], T extends number> =
  N['length'] extends 0
    ? false
    : Sub<T, N[0]> extends ArrToUnion<Tail<N>>
      ? true
      : TwoSum<Tail<N>, T>

type cases = [
  TwoSum<[1, 2, 3, 4], 5>,
  TwoSum<[1, 2, 3, 4], 10>
]
