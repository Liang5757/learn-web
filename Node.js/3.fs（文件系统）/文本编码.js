const fs = require('fs');

// BOM的移除
// BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"）
// 位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：
//     Bytes      Encoding
// ----------------------------
//     FE FF       UTF16BE
//     FF FE       UTF16LE
//     EF BB BF    UTF8
// 虽然BOM起到了标记文件编码的作用，但是在两个js文件合并成一个文件后，如果文件中间含有BOM字符，就会导致浏览器报错
// 下面是去除BOM的代码
function readText(pathname) {
  let bin = fs.readFileSync(pathname);

  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }

  return bin.toString('utf-8');
}

// GBK编码不在NodeJS自身支持范围内，需要借助 iconv-lite 这个三方包来转换编码
let iconv = require('iconv-lite');

function readGBKText(pathname) {
  let bin = fs.readFileSync(pathname);

  return iconv.decode(bin, 'gbk');
}
