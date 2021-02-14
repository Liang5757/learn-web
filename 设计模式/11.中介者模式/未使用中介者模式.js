// 玩家
function Player(name, teamColor) {
  this.partners = []; // 队友列表
  this.enemies = []; // 敌人列表
  this.state = "live"; // 玩家状态
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
}

Player.prototype.win = function () { // 玩家团队胜利
  console.log("winner: " + this.name);
};
Player.prototype.lose = function () { // 玩家团队失败
  console.log("loser: " + this.name);
};

// 玩家死亡的方法
Player.prototype.die = function () { // 玩家死亡
  let all_dead = true;
  this.state = "dead"; // 设置玩家状态为死亡
  for (let i = 0, partner; partner = this.partners[i++];) { // 遍历队友列表
    if (partner.state !== "dead") { // 如果还有一个队友没有死亡，则游戏还未失败
      all_dead = false;
      break;
    }
  }
  if (all_dead === true) { // 如果队友全部死亡
    this.lose(); // 通知自己游戏失败
    for (let i = 0, partner; partner = this.partners[i++];) {
      partner.lose();
    }
    for (let i = 0, enemy; enemy = this.enemies[i++];) {
      enemy.win();
    }
  }
};
// 定义一个工厂来创建玩家
let playerFactory = function (name, teamColor) {
  let newPlayer = new Player(name, teamColor);
  for (let i = 0, player; player = players[i++];) { // 通知所有的玩家，有新角色加入
    if (player.teamColor === newPlayer.teamColor) { // 如果是同一队的玩家
      player.partners.push(newPlayer); // 相互添加到队友列表
      newPlayer.partners.push(player);
    } else {
      player.enemies.push(newPlayer); // 相互添加到敌人列表
      newPlayer.enemies.push(player);
    }
  }
  players.push(newPlayer);
  return newPlayer;
};

let players = [];
//红队:
let player1 = playerFactory("皮蛋", "red"),
  player2 = playerFactory("小乖", "red"),
  player3 = playerFactory("宝宝", "red"),
  player4 = playerFactory("小强", "red");
//蓝队:
let player5 = playerFactory("黑妞", "blue"),
  player6 = playerFactory("葱头", "blue"),
  player7 = playerFactory("胖墩", "blue"),
  player8 = playerFactory("海盗", "blue");

// 让红队玩家全部死亡:
player1.die();
player2.die();
player4.die();
player3.die();
