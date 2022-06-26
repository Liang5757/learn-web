export type toArray<N, Arr extends any[] = []> =
  Arr['length'] extends N
    ? Arr
    : toArray<N, [...Arr, any]>

export type Add<T extends number, K extends number> = [...toArray<T>, ...toArray<K>]['length'];

export type Sub<T extends number, K extends number> =
  toArray<T> extends [...toArray<K>, ...infer rest]
    ? rest['length']
    : never

type _Multiple<T extends number, K extends number, Temp extends any[]> =
  K extends 0
    ? Temp['length']
    : _Multiple<T, Sub<K, 1>, [...Temp, ...toArray<T>]>
export type Multiple<T extends number, K extends number> = _Multiple<T, K, []>

type _Division<T extends number, K extends number, Temp extends any[]> =
  T extends 0
    ? Temp['length']
    : _Division<Sub<T, K>, K, [1, ...Temp]>
type Division<T extends number, K extends number> = _Division<T, K, []>

type cases = [
  Add<10, 5>,
  Sub<12, 4>,
  Multiple<50, 10>,
  Division<50, 10>,
]
