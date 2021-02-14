/*
 1.cookie保存在浏览器客户端
 2.可以让我们用同一个浏览器访问同一个域 名的时候共享数据


 1、保存用户信息
 2、浏览器历史记录
 3、猜你喜欢的功能
 4、10天免登陆
 5、多个页面之间的数据传递
 6、cookie实现购物车功能

 ctx.cookies.set('userinfo','liang',{
 maxAge:60*1000*60
 });

 let userinfo = ctx.cookies.get('userinfo');
 */


let Koa = require("koa"),
  router = require("koa-router")();

let app = new Koa();

router.get("/", async (ctx) => {
  //正常就这样配置就可以使用了
  /*
   ctx.cookies.set('userinfo','zhangsan',{
   maxAge:60*1000*60
   });
   **/
  ctx.cookies.set("userinfo", "liang", {
    maxAge: 60 * 1000 * 60, // 一小时
    // path:'/news',  /*配置可以访问的页面*/
    // domain:'.baidu.com'  /*正常情况不要设置 默认就是当前域下面的所有页面都可以方法*/
    httpOnly: false,  //true表示这个cookie只有服务器端可以访问，false表示客户端（js），服务器端都可以访问
    /*
     a.baidu.com
     b.baidu.com  共享cookie的数据
     * */
  });
  ctx.cookies.set("ppgod", Buffer.from("靓").toString("base64"));

  ctx.body = ctx.cookies.get("userinfo");
  ctx.body += Buffer.from(ctx.cookies.get("ppgod"), "base64").toString();
});

//接收post提交的数据
router.get("/shop", async (ctx) => {
  let userinfo = ctx.cookies.get("userinfo");
  console.log(userinfo);
  ctx.body = "这是一个商品页面" + userinfo;
});

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, function () {
  console.log("link: http://localhost:3000/");
});





