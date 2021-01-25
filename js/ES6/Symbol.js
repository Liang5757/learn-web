//Symbol为原始数据类型
let sy = Symbol("KK");
// 隐式转换会报错，只能显式的利用toString()转换，或者Boolean(sy)转换成bool类型
console.log("直接打印：" + sy.toString());                // Symbol(KK)
console.log(sy.description); // es2019新增属性 打印Symbol的描述"foo"
console.log(typeof(sy));        // "symbol"

// 相同参数 Symbol() 返回的值不相等
let sy1 = Symbol("KK");
console.log(sy === sy1);       // false

// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)

// 由于每一个 Symbol 的值都是不相等的，所以 Symbol 作为对象的属性名，可以保证属性不重名
let syObject = {
    [sy]: "kk"
};
console.log(syObject);    // {Symbol(key1): "kk"}
// Symbol 作为对象属性名时不能用.运算符，要用方括号
console.log(syObject[sy]); // "kk"
console.log(syObject.sy);   // undefined

// Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
// Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名，或者另一个新的 API，Reflect.ownKeys()
