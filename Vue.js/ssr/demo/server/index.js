const Vue = require("vue");
const Koa = require("koa");
let router = require("koa-router")();  // 引入是实例化路由 推荐

const app = new Koa();

router.get("/", async (ctx) => {
  // 第一步：创建一个 Vue 实例
  const page = new Vue({
    template: `<div>${ctx.req.url} Hello</div>`
  })
  
  // 第二步：创建一个 renderer
  const renderer = require("vue-server-renderer").createRenderer()
  
  // 第三步：将 Vue 实例渲染为HTML
  try {
    const html = await renderer.renderToString(page);
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
  
  // 在 2.5.0+，如果没有传入回调函数，则会返回promise
  // renderer.renderToString(app).then(html => {
  //   console.log(html)
  // }).catch(err => {
  //   console.error(err);
  // })
})


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080, () => {
  console.log("http://localhost:8080")
})
