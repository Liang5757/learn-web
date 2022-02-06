// ����װ�������η���/����
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
  descriptor.writable = false;
}

class Person{
  name: string;
  constructor() {
    this.name = 'xiaomuzhu';
  }
  
  @method
  say(){
    return 'instance method';
  }
  
  @method
  static run(){
    return 'static method';
  }
}

const xmz = new Person();

// �޸�ʵ������say
// xmz.say = function() {
//   return 'edit'
// }
//
// // ��ӡ���,����Ƿ�ɹ��޸�ʵ������
// console.log(xmz.say()); // error

export {};
