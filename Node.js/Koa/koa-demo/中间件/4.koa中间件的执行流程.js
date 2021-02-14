let Koa = require("koa");
let router = require("koa-router")();
let app = new Koa();

//Koa中间件
// http://localhost:3000/news
app.use(async (ctx, next) => {
  console.log("1、这是第一个中间件01"); // 1
  await next();
  console.log("5、匹配路由完成以后又会返回来执行中间件"); // 7
});

app.use(async (ctx, next) => {
  console.log("2、这是第二个中间件02"); // 2
  await next();
  console.log("4、匹配路由完成以后又会返回来执行中间件"); // 6
});

router.get("/", async (ctx) => {
  ctx.body = "首页"; // 3
});

router.get("/news", async (ctx) => {
  console.log("3、匹配到了news这个路由"); // 4
  ctx.body = "这是一个新闻"; // 5
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

// 1、这是第一个中间件01
// 2、这是第二个中间件02
// 3、匹配到了news这个路由
// 4、匹配路由完成以后又会返回来执行中间件
// 5、匹配路由完成以后又会返回来执行中间件
