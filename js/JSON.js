let str = '{ "name": "Geoff Lui", "age": 26}';   //����JSON�﷨������ַ���
//JSON.parse������JSON�﷨������ַ���ת��Ϊjs����
//JSON.parse�����еڶ���������Ϊһ������������Ϊname��value��ÿһ���/ֵ�Զ�����øú���������ֵ����ֵ����ǰ��name
let obj = JSON.parse(str, function (name, value) {
    console.log(name + ": " + value);
    return value;
});
console.log(typeof obj, obj);

//JSON.stringify��js����ת��ΪJSON�ַ���
//JSON.stringify��ѡ�ڶ�������������/���飩
// -- ��- ����Ǻ�������ÿһ������/ֵ�Զ�����ô˺������ú�������һ��ֵ����Ϊ���Ƶ�ֵ�任������ַ����У�������� undefined����ó�Ա�����ԡ�
// -- ��- ��������飬��ֻ�������д��ڵ�name���ܹ���ת����JSON�ַ�������ת����˳���������е�ֵ����һ�¡�
let jsonStr = JSON.stringify(obj, function (name, value){
    if (name === "age")
        value = 14;
    return value;
});

console.log(typeof jsonStr, jsonStr);
