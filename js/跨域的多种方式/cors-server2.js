//server2.js
let express = require("express")
let app = express()
let whitList = ["http://127.0.0.1:5500"] //设置白名单
app.use(function(req, res, next) {
  let origin = req.headers.origin
  if (whitList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader("Access-Control-Allow-Origin", origin)  
    // 允许携带哪个头访问我
    res.setHeader("Access-Control-Allow-Headers", "name") 
    // 允许哪个方法访问我,简单方法不受此条影响,因为这个首部字段仅用于预检请求，而get，post属于简单方法不用预检
    res.setHeader("Access-Control-Allow-Methods", "GET") 
    // 允许携带cookie
    res.setHeader("Access-Control-Allow-Credentials", true)
    // 预检的存活时间
    res.setHeader("Access-Control-Max-Age", 6)    
    res.setHeader("Access-Control-Expose-Headers", "name")  
    if (req.method === "OPTIONS") {   //预检头
      res.end("可以访问") // OPTIONS请求不做任何处理
    }
  }
  next()
})
app.put("/getData", function(req, res) {
  // console.log(req.headers)
  res.setHeader("name", "jw") //返回一个响应头，后台需设置
  res.end("我是put")
})
app.get("/getData", function(req, res) {
  console.log(req.headers)
  res.end("我是get")
})
app.post("/getData", function(req, res) {
  console.log(req.headers)
  res.end("我是post")
})
app.use(express.static(__dirname))
app.listen(4000)
console.log("4000端口已开启");

