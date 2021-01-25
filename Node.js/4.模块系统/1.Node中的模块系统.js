// - 模块化
// - ES5中没有原生支持模块化，我们只能通过script标签引入js文件来实现模块化
// - 在node中为了对模块管理，引入了CommonJS规范
//
// - 模块的引用
// - 使用 require()函数来引入一个模块
// - 例子：
// 					var 变量 = require("模块的标识");
//
// - 模块的定义
// - 在node中一个js文件就是一个模块
// - 默认情况下在js文件中编写的内容，都是运行在一个独立的函数中，
// 					外部的模块无法访问
//                     - 导出变量和函数
//                     - 使用 exports
// - 例子：
// 			exports.属性 = 属性值;
//      exports.方法 = 函数;
//
// - 使用module.exports
// - 例子：
// 			module.exports.属性 = 属性值;
//      module.exports.方法 = 函数;
//      module.exports = {};
//
// - 模块的标识
// - 模块的标识就是模块的名字或路径
// 我们node通过模块的标识来寻找模块的
// 对于核心模块（npm中下载的模块），直接使用模块的名字对其进行引入
// var fs = require("fs");
// var express = require("express");
//
// 对于自定义的文件模块，需要通过文件的路径来对模块进行引入
// 路径可以是绝对路径，如果是相对路径必须以./或 ../开头
// var router = require("./router");

/*
	在node中有一个全局对象 global，它的作用和网页中window类似
		在全局中创建的变量都会作为global的属性保存
		在全局中创建的函数都会作为global的方法保存

	当node在执行模块中的代码时，它会首先在代码的最顶部，添加如下代码
 			function (exports, require, module, __filename, __dirname) {
 	在代码的最底部，添加如下代码
 			}

 	实际上模块中的代码都是包装在一个函数中执行的，并且在函数执行时，同时传递进了5个实参
		 exports
		 	- 该对象用来将变量或函数暴露到外部

		 require
		 	- 函数，用来引入外部的模块
		 	- 参数为文件路径

		 module
		 	- module代表的是当前模块本身
		 	- exports就是module的属性
		 	- 既可以使用 exports 导出，也可以使用module.exports导出


		 __filename
 			D:\web_pj\test\Node.js\Node中的模块系统.js
 			- 当前模块的完整路径

	  	 __dirname
 			D:\web_pj\test\Node.js
 			- 当前模块所在文件夹的完整路径
**/

// 不用let、var或者const声明直接赋值，则为全局变量
a = 10;
// 全局的内容作为global的属性保存
console.log(global.a);
