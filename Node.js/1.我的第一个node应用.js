const http = require('http');
const https = require('https');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(request, response) {
  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  // 发送响应数据 "Hello World"
  response.end('Hello World\n');
})

// listen方法绑定端口8888
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// HTTP请求数据内容
// POST / HTTP/1.1
// User-Agent: curl/7.26.0
// Host: localhost
// Accept: */*
// Content-Length: 11
// Content-Type: application/x-www-form-urlencoded
//
// Hello World
// 可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的
// 而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数

// HTTP响应数据内容
// HTTP/1.1 200 OK
// Content-Type: text/plain
// Content-Length: 11
// Date: Tue, 05 Nov 2013 05:31:38 GMT
// Connection: keep-alive
//
// Hello World


// https
let options = {
  key: fs.readFileSync('./ssl/default.key'), // 私钥
  cert: fs.readFileSync('./ssl/default.cer') // 密钥
};

let server2 = https.createServer(options, function(request, response) {
  // ...
}).listen(80);


// 问： 为什么http模块创建的HTTP服务器返回的响应是chunked传输方式的？
// 答： 因为默认情况下，使用.writeHead方法写入响应头后，允许使用.write方法写入任意长度的响应体数据，
// 并使用.end方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了Transfer-Encoding: chunked字段，
// 并采用chunked传输方式。但是当响应体数据长度确定时，可使用.writeHead方法在响应头里加上Content-Length字段，
// 这样做之后NodeJS就不会自动添加Transfer-Encoding字段和使用chunked传输方式。

// 问： 为什么使用http模块发起HTTP客户端请求时，有时候会发生socket hang up错误？
// 答： 发起客户端HTTP请求前需要先创建一个客户端。http模块提供了一个全局客户端http.globalAgent，
// 可以让我们使用.request或.get方法时不用手动创建客户端。但是全局客户端默认只允许5个并发Socket连接，
// 当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生socket hang up错误。解决方法也很简单，
// 通过http.globalAgent.maxSockets属性把这个数字改大些即可。另外，https模块遇到这个问题时也一样通过
// https.globalAgent.maxSockets属性来处理。
