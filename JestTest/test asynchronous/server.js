const http = require('http');

http.createServer(function (req, res) {
  if (req.url === '/') {
    res.setHeader("Access-Control-Allow-Origin", "*");  // 允许所有路径跨域
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.writeHead(200);
    res.end(JSON.stringify({ success: true }));
  }
}).listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
})
