//引入 koa模块
let Koa = require("koa");
let router = require("koa-router")();  /*引入是实例化路由** 推荐*/
let app = new Koa();

//Koa中间件
//匹配任何路由，如果不写next，这个路由被匹配到了就不会继续向下匹配
// http://localhost:3000/news
router.get("/", async (ctx) => {
  ctx.body = "首页";
});

// 匹配到news路由以后继续向下匹配路由
router.get("/news", async (ctx, next) => {
  console.log("这是一个新闻1");
  await next();
});

router.get("/news", async (ctx) => {
  ctx.body = "这是一个新闻"; // 页面显示：这是一个新闻
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);







