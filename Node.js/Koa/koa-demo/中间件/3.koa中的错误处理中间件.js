//引入 koa模块
let Koa = require("koa");
let router = require("koa-router")();  /*引入是实例化路由** 推荐*/
let app = new Koa();

// http://localhost:3000/non-pages
app.use(async (ctx, next) => {
  next();

  if (ctx.status === 404) {   /*如果页面找不到*/
    ctx.status = 404;
    ctx.body = "这是一个 404 页面";
  } else {
    console.log(ctx.url);
  }
});

router.get("/", async (ctx) => {
  ctx.body = "首页";
});

router.get("/news", async (ctx) => {
  ctx.body = "这是一个新闻";
});

router.get("/login", async (ctx) => {
  ctx.body = "新闻列表页面";
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);







