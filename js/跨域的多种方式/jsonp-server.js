// server.js
let express = require("express")
let app = express()
app.get("/say", function (req, res) {
  let {wd, callback} = req.query
  console.log(wd) // Iloveyou
  console.log(callback) // show
  res.end(`${callback}('我不爱你')`)
})
app.listen(3000)
console.log("服务器运行于 http://127.0.0.1:3000/")
