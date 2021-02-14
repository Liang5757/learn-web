const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./data.txt");
const ws = fs.createWriteStream(filename, {
  encoding: "utf-8",
  highWaterMark : 7,
  autoClose : true
});

let content = "测试流"
let index = 0;
let contentLength = content.length;

// 一直写，直到填满通道
function write() {
  let flag = true;
  while ((index < contentLength) && flag) {
    // 写入内容，内容可以是字符串或者Buffer
    // 返回值标识通道是否被填满
    // true：写入通道没有被填满，接下来的数据可以直接写入，无须排队
    // false：写入通道目前已被填满，接下来的数据将进入写入队列进行排队
    flag = ws.write(content[index]);
    console.log(flag)
    index++;
  }
  if (index === contentLength) {
    ws.end(() => {
      console.log("写入完成");
    })
  }
}
// 当写入队列清空时，会触发drain事件
// 之所以要这么做，是因为写入队列是内存中的数据，是有限的，会产生背压问题
// 所以要等写入队列清空了再继续写入
ws.on("drain", () => {
  console.log("队列清空");
  write();
});

write();
