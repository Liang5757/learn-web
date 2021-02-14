// 命令行输入: node 执行命令后的参数.js name=joe
// 第一个参数是 node 命令的完整路径。
// 第二个参数是正被执行的文件的完整路径。
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})
// 0: D:\ProgramData\Node.js\node.exe
// 1: D:\web_pj\learn\Node.js\从命令行接受参数\执行命令后的参数.js
// 2: name=joe

// 最好的方法是使用 minimist 库，该库有助于处理参数：
const args = require('minimist')(process.argv.slice(2))
console.log(args);
// 但是需要在每个参数名称之前使用双破折号：
// node 执行命令后的参数.js --name=joe
// 输出：{ _: [], name: 'joe' }
