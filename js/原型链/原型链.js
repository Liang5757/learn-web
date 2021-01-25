function Person() {

}
var person = new Person();

// 函数（Person）的prototype指向一个对象，这个对象正是调用该构造函数而创建的实例的原型
// JavaScript对象(null除外)在创建的时候就会与之关联另一个对象（即为原型），每一个对象都会从原型"继承"属性
// 每一个JavaScript对象(除了 null )都具有__proto__，这个属性会指向该对象的原型
console.log(person.__proto__ === Person.prototype); // true
// 总结1：对象的__proto__和函数的prototype会指向原型对象

// 每个原型都有一个 constructor 属性指向关联的构造函数
console.log(Person === Person.prototype.constructor); // true

// Object.prototype的原型即 Object.prototype.__proto__ 的值为 null
console.log(Object.prototype.__proto__ === null);    // true

// 附：person实例实际上并无 constructor 属性，所以会从其原型person.__proto__找，也就是Person.prototype中读取
console.log(person.constructor === Person);     // true
console.log(person.constructor === Person.prototype.constructor);    // true

// __proto__
// 绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中
// 实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，
// 当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)
