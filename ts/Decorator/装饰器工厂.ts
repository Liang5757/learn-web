// ��ӡ���캯��
function logClass (target: typeof Person) {
  console.log(target)
}

// ��ӡ������
function logProperty (target: any, propertyKey: string) {
  console.log(propertyKey);
}

// ��ӡ������
function logMethod (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(propertyKey);
}

// ��ӡ����λ��
function logParameter (target: Object, propertyKey: string, index: number) {
  console.log(index);
}

function log (this: unknown, ...args: any) {
  switch (args.length) {
    case 1:
      return logClass.apply(this, args);
    case 2:
      return logProperty.apply(this, args);
    case 3:
      if (typeof args[2] === "number") {
        return logParameter.apply(this, args);
      }
      return logMethod.apply(this, args);
    default:
      throw new Error("Decorators are not valid here!");
  }
}

@log
class Person {
  
  @log
  public name: string;
  
  constructor (name: string) {
    this.name = name;
  }
  
  @log
  public greet (@logParameter message: string): string {
    return `${this.name} say: ${message}`;
  }
}

// װ������ִ��˳��
// �����������ζ�װ�������ʽ��ֵ
// ��ֵ�Ľ���ᱻ���������������������ε���

// ���в�ͬ�����ϵ�װ�����������¹涨��˳��Ӧ�ã�
// ����װ������Ȼ�������Ƿ���װ���������ʷ�װ������������װ����Ӧ�õ�ÿ��ʵ����Ա
// ����װ������Ȼ�������Ƿ���װ���������ʷ�װ������������װ����Ӧ�õ�ÿ����̬��Ա
// ����װ����Ӧ�õ����캯��
// ��װ����Ӧ�õ���

export {};
