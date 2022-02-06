/* 1. interface�к������͵�����ȡ���� */
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  
  updatePart (newName: string): void;
}

type R1 = FunctionPropertyNames<Part>; // ��Ҫ���ΪupdatePart
// 1. ��
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]


/* 2. interface�п�ѡ���Ե�����ȡ���� */
interface People {
  id: string
  name: string
  age?: number
  from?: string
}

type R2 = NullableKeys<People> // type R = "age" | "from"
// 2. ��
type NullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? K : never }[keyof T];


/* 3. LeetCode hire�� */
interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";
  
  delay (input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }
  
  setMessage (action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}

type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>> // ת��ǰ
type asyncMethodConnect<T, U> = (input: T) => Action<U> // ת����
type syncMethod<T, U> = (action: Action<T>) => Action<U> // ת��ǰ
type syncMethodConnect<T, U> = (action: T) => Action<U> // ת����

// �޸� Connect �����ͣ��� connected �����ͱ��Ԥ�ڵ�����
type MethodNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type EffectModuleMethodsConnect<T> = T extends asyncMethod<infer U, infer V>
  ? asyncMethodConnect<U, V>
  : T extends syncMethod<infer U, infer V>
    ? syncMethodConnect<U, V>
    : never
type EffectModuleMethods = MethodNames<EffectModule>;

type Connect = (module: EffectModule) => {
  [M in EffectModuleMethods]: EffectModuleMethodsConnect<EffectModule[M]>
}

const connect: Connect = m => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello 2`
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
  })
});

type Connected = {
  delay (input: number): Action<string>;
  setMessage (action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());

export {};

