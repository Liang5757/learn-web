const http = require('http');
const https = require('https');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(request, response) {
  // ���� HTTP ͷ��
  // HTTP ״ֵ̬: 200 : OK
  // ��������: text/plain
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  // ������Ӧ���� "Hello World"
  response.end('Hello World\n');
})

// listen�����󶨶˿�8888
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// HTTP������������
// POST / HTTP/1.1
// User-Agent: curl/7.26.0
// Host: localhost
// Accept: */*
// Content-Length: 11
// Content-Type: application/x-www-form-urlencoded
//
// Hello World
// ������Ϊ�ǰ��մ�ͷ��β��˳��һ���ֽ�һ���ֽڵ�����������ʽ���͵�
// ��httpģ�鴴����HTTP�������ڽ��յ�����������ͷ�󣬾ͻ���ûص�����

// HTTP��Ӧ��������
// HTTP/1.1 200 OK
// Content-Type: text/plain
// Content-Length: 11
// Date: Tue, 05 Nov 2013 05:31:38 GMT
// Connection: keep-alive
//
// Hello World


// https
let options = {
  key: fs.readFileSync('./ssl/default.key'), // ˽Կ
  cert: fs.readFileSync('./ssl/default.cer') // ��Կ
};

let server2 = https.createServer(options, function(request, response) {
  // ...
}).listen(80);


// �ʣ� Ϊʲôhttpģ�鴴����HTTP���������ص���Ӧ��chunked���䷽ʽ�ģ�
// �� ��ΪĬ������£�ʹ��.writeHead����д����Ӧͷ������ʹ��.write����д�����ⳤ�ȵ���Ӧ�����ݣ�
// ��ʹ��.end��������һ����Ӧ��������Ӧ�����ݳ��Ȳ�ȷ�������NodeJS�Զ�����Ӧͷ�������Transfer-Encoding: chunked�ֶΣ�
// ������chunked���䷽ʽ�����ǵ���Ӧ�����ݳ���ȷ��ʱ����ʹ��.writeHead��������Ӧͷ�����Content-Length�ֶΣ�
// ������֮��NodeJS�Ͳ����Զ����Transfer-Encoding�ֶκ�ʹ��chunked���䷽ʽ��

// �ʣ� Ϊʲôʹ��httpģ�鷢��HTTP�ͻ�������ʱ����ʱ��ᷢ��socket hang up����
// �� ����ͻ���HTTP����ǰ��Ҫ�ȴ���һ���ͻ��ˡ�httpģ���ṩ��һ��ȫ�ֿͻ���http.globalAgent��
// ����������ʹ��.request��.get����ʱ�����ֶ������ͻ��ˡ�����ȫ�ֿͻ���Ĭ��ֻ����5������Socket���ӣ�
// ��ĳһ��ʱ��HTTP�ͻ������󴴽����࣬�����������ʱ���ͻᷢ��socket hang up���󡣽������Ҳ�ܼ򵥣�
// ͨ��http.globalAgent.maxSockets���԰�������ָĴ�Щ���ɡ����⣬httpsģ�������������ʱҲһ��ͨ��
// https.globalAgent.maxSockets����������
