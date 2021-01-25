let str = '{ "name": "Geoff Lui", "age": 26}';   //符合JSON语法规则的字符串
//JSON.parse将符合JSON语法规则的字符串转化为js对象
//JSON.parse可以有第二个参数，为一个函数，参数为name和value，每一组键/值对都会调用该函数，返回值将赋值给当前的name
let obj = JSON.parse(str, function (name, value) {
    console.log(name + ": " + value);
    return value;
});
console.log(typeof obj, obj);

//JSON.stringify将js对象转化为JSON字符串
//JSON.stringify可选第二个参数（函数/数组）
// -- ①- 如果是函数，则每一组名称/值对都会调用此函数，该函数返回一个值，作为名称的值变换到结果字符串中，如果返回 undefined，则该成员被忽略。
// -- ②- 如果是数组，则只有数组中存在的name才能够被转换成JSON字符串，且转换后顺序与数组中的值保持一致。
let jsonStr = JSON.stringify(obj, function (name, value){
    if (name === "age")
        value = 14;
    return value;
});

console.log(typeof jsonStr, jsonStr);
