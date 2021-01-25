const http = require('http');
const zlib = require('zlib');

// ѹ��HTTP��Ӧ������
http.createServer(function (request, response) {
  let i = 1024,
    data = '';

  while (i--) {
    data += '.';
  }

  // �ж��˿ͻ����Ƿ�֧��gzip
  if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
    // ֧�ֵ������ʹ��zlibģ�鷵��gzip֮�����Ӧ������
    zlib.gzip(data, function (err, data) {
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
      });
      response.end(data);
    });
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.end(data);
  }
}).listen(80);

// ��ѹHTTP��Ӧ������
let options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET',
  headers: {
    'Accept-Encoding': 'gzip, deflate'
  }
};

http.request(options, function (response) {
  let body = [];

  response.on('data', function (chunk) {
    body.push(chunk);
  });

  response.on('end', function () {
    body = Buffer.concat(body);

    if (response.headers['content-encoding'] === 'gzip') {
      zlib.gunzip(body, function (err, data) {
        console.log(data.toString());
      });
    } else {
      console.log(data.toString());
    }
  });
}).end();
