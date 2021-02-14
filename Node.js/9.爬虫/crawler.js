const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express()

app.get('/', function(req, res, next) {
  superagent.get('https://news.baidu.com/').end(function(err, sres) {
    // 常规的错误处理
    if (err) {
      return next(err);
    }
    // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
    // 剩下就都是 jquery 的内容了
    let $ = cheerio.load(sres.text);
    let items = [];
    $('.hotnews ul li a').each((index, Element) => {
      // 遍历保存每一项的信息
      items.push({
        title: $(Element).text(),
        href: $(Element).attr('href')
      })
    })

    res.send(items);
  });
});


app.listen(3000, function() {
  console.log('app is listening at port localhost:3000')
})

