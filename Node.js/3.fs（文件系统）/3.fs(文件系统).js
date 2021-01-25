/*
	文件系统（File System）
		- 文件系统简单来说就是通过Node来操作系统中的文件
		- 使用文件系统，需要先引入fs模块，fs是核心模块，直接引入不需要下载

	同步文件的写入
		- 手动操作的步骤
			1.打开文件
 				fs.openSync(path, flags[, mode])
 					- path 要打开文件的路径
 					- flags 打开文件要做的操作的类型
 						r 只读的
 						w 可写的
 					- mode 设置文件的操作权限，一般不传
				 返回值：
				 - 该方法会返回一个文件的描述符作为结果，我们可以通过该描述符来对文件进行各种操作

			2.向文件中写入内容
 				fs.writeSync(fd, string[, position[, encoding]])
 					- fd 文件的描述符，需要传递要写入的文件的描述符
 					- string 要写入的内容
 					- position 写入的起始位置
 					- encoding 写入的编码，默认utf-8

			3.保存并关闭文件
 				fs.closeSync(fd)
 					- fd 要关闭的文件的描述符
 */

let fs = require("fs");

let fd = fs.openSync("hello_fs.txt", "w");
console.log("文件的描述符:" + fd);    // 3 文件编号为3(文件的描述符)

// 写入文件
fs.writeSync(fd, "出现了，乱码！");

// 关闭文件
fs.closeSync(fd);

/*
    异步文件写入
        fs.open(path, flags[, mode], callback)
        - 用来打开一个文件
        - 异步调用的方法，结果都是通过回调函数的参数返回的
        - 回调函数两个参数：
            err 错误对象，如果没有错误则为null
            fd  文件的描述符

        fs.write(fd, string[, position[, encoding]], callback)
        - 用来异步写入一个文件

        fs.close(fd, callback)
        - 用来关闭文件

        node的异步就是以回调函数的形式操作的
*/

fs.open("hello_fs2.txt", "w", function (err, fd) {
    // 判断是否出错
    if (err) {
        console.log(err);
    } else {
        // written: 指定传入的字符串被写入多少字节
        fs.write(fd, "This is an asynchronous write file", 2,function (err, written, string) {
            if (!err) {
                console.log("success!");
            } else {
                console.log(err);
            }
            //关闭文件
            fs.close(fd , function (err) {
                if(!err){
                    console.log("文件已关闭~~~");
                }
            });
        })
    }
});
console.log("keep execute!");

/*
	简单文件写入
    fs.writeFile(file, data[, options], callback)
    fs.writeFileSync(file, data[, options])
        - file 要操作的文件的路径
        - data 要写入的数据
        - options 选项，可以对写入进行一些设置
            -encoding <string> | <null> 默认值: 'utf8'
            -mode <integer> 默认值: 0o666
            -flag <string> 参阅支持的文件系统标志。默认值: 'w'
        - callback 当写入完成以后执行的函数
 */

fs.writeFile("hello_fs3.txt","这是通过writeFile写入的内容",{flag:"w"} , function (err) {
    if(!err){
        console.log("writeFile~~~");
    }else{
        console.log(err);
    }
});

/*
    流式文件写入
        创建一个可写流
        fs.createWriteStream(path[, options])
            - 可以用来创建一个可写流
            - path，文件路径
            - options 配置的参数
 */

let ws = fs.createWriteStream("hello_ws.txt");

//可以通过监听流的open和close事件来监听流的打开和关闭
/*
	on(事件字符串,回调函数)
		- 可以为对象绑定一个事件

	once(事件字符串,回调函数)
		- 可以为对象绑定一个一次性的事件，该事件将会在触发一次以后自动失效
**/
ws.once("open",function () {
    console.log("流打开了~~~");
});

ws.once("close",function () {
    console.log("流关闭了~~~");
});

//通过ws向文件中输出内容
ws.write("通过可写流写入文件的内容");
ws.write("今天天气真不错");
ws.write("锄禾日当午");
ws.write("红掌拨清清");
ws.write("清清真漂亮");

//关闭流
ws.end();

/*
	1.同步文件读取
	2.异步文件读取
	3.简单文件读取
	 fs.readFile(path[, options], callback)
	 fs.readFileSync(path[, options])
	 	- path 要读取的文件的路径
	 	- options 读取的选项
	 	- callback回调函数，通过回调函数将读取到内容返回(err , data)
	 		err 错误对象
	 		data 读取到的数据，会返回一个Buffer
	4.流式文件读取
 */

// 完成一个复制功能
fs.readFile("hello_fs.txt", function (err, data) {
    if (!err) {
        fs.writeFile("hello_readFile.txt", data, function(err){
            if(!err){
                console.log("success copy!");
            }
        } );
    }
});

/*
	流式文件读取也适用于一些比较大的文件，可以分多次将文件读取到内存中
 */
//创建一个可读流
const rs = fs.createReadStream("hello_fs.txt");
//创建一个可写流
const ws2 = fs.createWriteStream("hello_rs.txt");

//pipe()可以将可读流中的内容，直接输出到可写流中
rs.pipe(ws2);