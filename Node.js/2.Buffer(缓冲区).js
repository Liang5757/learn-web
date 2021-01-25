/*
	Buffer(缓冲区)
		- Buffer的结构和数组很像，操作的方法也和数组类似，对应于V8堆内存之外的一块原始内存
		- 数组中不能存储二进制的文件，而buffer就是专门用来存储二进制数据（TCP流、文件流等）
		- 使用buffer不需要引入模块，直接使用即可
		- 在buffer中存储的都是二进制数据，但是在显示时都是以16进制的形式显示
			buffer中每一个元素的范围是从00 - ff   0 - 255，大于则截断
			buffer中的一个元素，占用内存的一个字节
		- Buffer的大小一旦确定，则不能修改，Buffer实际上是对底层内存的直接操作
 */

let str = "Hello Buffer!";
// 将一个字符串保存到buffer中
let buf = Buffer.from(str);
console.log(buf);           // <Buffer 48 65 6c 6c 6f 20 42 75 66 66 65 72 21>
console.log(buf.length);    // 13

//创建一个10个字节的buffer
const buf2 = Buffer.alloc(10);
console.log(buf2);          // 默认初始化为0 <Buffer 00 00 00 00 00 00 00 00 00 00>
//通过索引，来操作buf中的元素
buf2[0] = 88;
buf2[1] = 0xaa;
buf2[10] = 255;             // buffer长度一旦确定，则无法修改，所以该语句没作用在buf2上
console.log(buf2);
console.log(buf2[1]);       // 只要打印数字则输出10进制，输出170
