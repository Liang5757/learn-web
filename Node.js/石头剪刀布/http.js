const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game');

let playerWon = 0;  // 胜利次数
let playerLastAction = null;
let sameCount = 0;

http.createServer(function (request, response) {
  const parseUrl = url.parse(request.url);
  response.setHeader("Content-Type", "text/html; charset=utf-8")

  if (parseUrl.pathname === '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  }

  if (parseUrl.pathname === '/game') {
    // 如果请求url是游戏请求，比如 http://localhost:3000/game?action=rock的情况
    // 就要把action解析出来，然后执行游戏逻辑
    const query = querystring.parse(parseUrl.query);
    const playerAction = query.action;

    // 如果统计的玩家胜利次数超过3
    // 或者玩家出现过作弊的情况（sameCount=9代表玩家有过作弊行为）
    if (playerWon >= 3 || sameCount === 9) {
      response.writeHead(500);
      response.end('我再也不和你玩了！');
      return
    }

    // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
    // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
    if (playerLastAction && playerAction === playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction

    if (sameCount >= 3) {
      response.writeHead(400);
      response.end('你作弊！');  
      sameCount = 9;
      return
    }

    // 执行游戏逻辑
    const gameResult = game(playerAction);

    // 先返回头部
    response.writeHead(200);

    // 根据不同的游戏结果返回不同的说明
    if (gameResult === 0) {
      response.end('平局！');
    } else if (gameResult === 1) {
      response.end('你赢了！');
      // 玩家胜利次数统计+1
      playerWon++;
    } else {
      response.end('你输了！');
    }
  }

  if (parseUrl.pathname === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(response);
  }
}).listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
