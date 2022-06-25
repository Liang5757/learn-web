const routes = [{
  routerId: '123',
  stop: 12
}];

const routeStep = [{
  routerId: "123",
  steps: [{
    duration: 123,
    distance: 345
  }]
}]

// ��ͬ���󣬲�ͬ����ts�ж϶�Ӧֵһ����ͬ����ʵ�������п�����ͬ�ģ�������Ҫ�Ӹ�����װ��
const find = <T extends Array<any>, S extends Array<any>, TK extends keyof T, SK extends keyof S>(args1: T, args2: S, key1: TK, key2: SK): T | undefined =>{
  return args1.find((arg1: T) => {
    // TS2367: This condition will always return 'false' since the types 'S[SK]' and 'T[TK]' have no overlap.
    return args2.findIndex((arg2: S) => arg2[key2] === arg1[key1] as any) !== -1; // ���� as any
  })
}

