let Koa = require("koa");
let bodyParser = require("koa-bodyparser");
let router = require("koa-router")();
let views = require("koa-views");

let app = new Koa();

app.use(bodyParser());
app.use(views(`${__dirname}/views`, {
  extension: "ejs",  // 应用ejs模板引擎
}));

router.get("/", async (ctx) => {
  await ctx.render("login");
});

//接收post提交的数据
router.post("/doAdd", async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;  //获取表单提交的数据
});

// 原生获取
function getPostData(ctx) {
  //获取数据  异步
  return new Promise(function (resolve, reject) {
    try {
      let str = "";

      ctx.req.on("data", function (chunk) {
        str += chunk;
      });

      ctx.req.on("end", function (chunk) {
        resolve(str);
      });

    } catch (err) {
      reject(err);
    }
  });
}

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, function () {
  console.log("link: http://localhost:3000/");
});
