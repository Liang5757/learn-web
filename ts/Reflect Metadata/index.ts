// // define metadata on an object or property
// Reflect.defineMetadata(metadataKey, metadataValue, target);
// Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
//
// // check for presence of a metadata key on the prototype chain of an object or property
// let result = Reflect.hasMetadata(metadataKey, target);
// let result = Reflect.hasMetadata(metadataKey, target, propertyKey);
//
// // check for presence of an own metadata key of an object or property
// let result = Reflect.hasOwnMetadata(metadataKey, target);
// let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey);
//
// // get metadata value of a metadata key on the prototype chain of an object or property
// let result = Reflect.getMetadata(metadataKey, target);
// let result = Reflect.getMetadata(metadataKey, target, propertyKey);
//
// // get metadata value of an own metadata key of an object or property
// let result = Reflect.getOwnMetadata(metadataKey, target);
// let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey);
//
// // get all metadata keys on the prototype chain of an object or property
// let result = Reflect.getMetadataKeys(target);
// let result = Reflect.getMetadataKeys(target, propertyKey);
//
// // get all own metadata keys of an object or property
// let result = Reflect.getOwnMetadataKeys(target);
// let result = Reflect.getOwnMetadataKeys(target, propertyKey);
//
// // delete metadata from an object or property
// let result = Reflect.deleteMetadata(metadataKey, target);
// let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);
//
// // apply metadata via a decorator to a constructor
// @Reflect.metadata(metadataKey, metadataValue)
// class C {
//   // apply metadata via a decorator to a method (property)
//   @Reflect.metadata(metadataKey, metadataValue)
//   method() {
//   }
// }

import 'reflect-metadata'

@Reflect.metadata('name', 'xiaomuzhu')
class Person {
  
  @Reflect.metadata('time', '2019/10/10')
  public say(): string {
    return 'hello'
  }
}

console.log(Reflect.getMetadata('name', Person)) // xiaomuzhu
console.log(Reflect.getMetadata('time', new Person, 'say')) // 2019/10/10

// 内置元数据

// 获取参数的类型，返回数组
const type = Reflect.getMetadata("design:type", new Person, 'say')

// 取函数的返回类型
const typeReturn = Reflect.getMetadata("design:returntype", new Person, 'say')
