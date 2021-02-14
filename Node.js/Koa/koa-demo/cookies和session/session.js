/*
 app.keys = ['some secret hurr'];

 const CONFIG = {
 key: 'koa:sess',
 maxAge: 86400000,
 overwrite: true,
 httpOnly: true,
 signed: true,
 rolling: false,
 renew: false,
 };

 app.use(session(CONFIG, app));


 设置 session
 ctx.session.username = "张三"

 获取 session
 ctx.session.username
 * */

let Koa = require("koa"),
  router = require("koa-router")(),
  session = require("koa-session");


let app = new Koa();
//配置session的中间件
app.keys = ["some secret signature"];   /*cookie的签名*/
const CONFIG = {
  key: "koa:sess", // 默认
  maxAge: 10000,  //  cookie的过期时间        【需要修改】
  overwrite: true, // (boolean) can overwrite or not (default true)    没有效果，默认
  httpOnly: true, //  true表示只有服务器端可以获取cookie
  signed: true, // 默认 签名
  rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】
  renew: false, // (boolean) renew session when session is nearly expired      【需要修改】
};
app.use(session(CONFIG, app));

router.get("/", async (ctx) => {
  //获取session
  console.log(ctx.session.userinfo);

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});


router.get("/login", async (ctx) => {
  //设置session
  ctx.session.userinfo = "张三";
  ctx.body = "登录成功";
});


app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, function () {
  console.log("link: http://localhost:3000/login");
});






