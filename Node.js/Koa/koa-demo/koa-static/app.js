let Koa = require("koa");
let router = require("koa-router")();
let koa_static = require("koa-static");

let app = new Koa();

// app.use(koa_static(`${__dirname}/html`));
app.use(koa_static(`${__dirname}/html`, { // koa静态资源中间件可以配置多个
  index: "teacher.html", // 默认是index.html
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, function () {
  console.log("link: http://localhost:3000/");
});
