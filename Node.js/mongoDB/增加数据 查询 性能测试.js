let MongoClient = require("mongodb").MongoClient;
let dbUrl = "mongodb://localhost:27017/";

let dbName = "koa";

//连接数据库
console.time('start1');
MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }

  let db = client.db(dbName);
  console.timeEnd("start1");
  //增加数据
  db.collection("user").insertOne({ "username": "wangwu", "age": 26, "sex": "男", "status": "1" }, function (err, result) {
    if (!err) {
      //console.log('增加数据成功');
      client.close();
    }
  });
});

console.time('start2');
MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }

  let db = client.db(dbName);
  //查询数据
  let result = db.collection("user").find({});
  result.toArray((err, docs) => {
    console.timeEnd("start2");
    console.log(docs);
  });
});




