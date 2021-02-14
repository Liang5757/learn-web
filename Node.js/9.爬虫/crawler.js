const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express()

app.get('/', function(req, res, next) {
  superagent.get('https://news.baidu.com/').end(function(err, sres) {
    // ����Ĵ�����
    if (err) {
      return next(err);
    }
    // sres.text ����洢����ҳ�� html ���ݣ��������� cheerio.load ֮��
    // �Ϳ��Եõ�һ��ʵ���� jquery �ӿڵı���������ϰ���Եؽ�������Ϊ `$`
    // ʣ�¾Ͷ��� jquery ��������
    let $ = cheerio.load(sres.text);
    let items = [];
    $('.hotnews ul li a').each((index, Element) => {
      // ��������ÿһ�����Ϣ
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

