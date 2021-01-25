function Person() {

}
var person = new Person();

// ������Person����prototypeָ��һ����������������ǵ��øù��캯����������ʵ����ԭ��
// JavaScript����(null����)�ڴ�����ʱ��ͻ���֮������һ�����󣨼�Ϊԭ�ͣ���ÿһ�����󶼻��ԭ��"�̳�"����
// ÿһ��JavaScript����(���� null )������__proto__��������Ի�ָ��ö����ԭ��
console.log(person.__proto__ === Person.prototype); // true
// �ܽ�1�������__proto__�ͺ�����prototype��ָ��ԭ�Ͷ���

// ÿ��ԭ�Ͷ���һ�� constructor ����ָ������Ĺ��캯��
console.log(Person === Person.prototype.constructor); // true

// Object.prototype��ԭ�ͼ� Object.prototype.__proto__ ��ֵΪ null
console.log(Object.prototype.__proto__ === null);    // true

// ����personʵ��ʵ���ϲ��� constructor ���ԣ����Ի����ԭ��person.__proto__�ң�Ҳ����Person.prototype�ж�ȡ
console.log(person.constructor === Person);     // true
console.log(person.constructor === Person.prototype.constructor);    // true

// __proto__
// ���󲿷��������֧������Ǳ�׼�ķ�������ԭ�ͣ�Ȼ�������������� Person.prototype ��
// ʵ���ϣ����������� Object.prototype ������˵��һ�����ԣ�����˵��һ�� getter/setter��
// ��ʹ�� obj.__proto__ ʱ���������ɷ����� Object.getPrototypeOf(obj)
