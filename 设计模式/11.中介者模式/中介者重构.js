// 玩家
function Player(name, teamColor) {
  this.state = "live"; // 玩家状态
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
}

Player.prototype.win = function(){
  console.log( this.name + ' won ' );
};

Player.prototype.lose = function(){
  console.log( this.name +' lost' );
};

/*******************玩家死亡*****************/
Player.prototype.die = function () {
  this.state = "dead";
  playerDirector.receiveMessage("playerDead", this);// 给中介者发送消息，玩家死亡
};

/*******************移除玩家*****************/
Player.prototype.remove = function () { // 给中介者发送消息，移除一个玩家
  playerDirector.receiveMessage("removePlayer", this);
};

/*******************玩家换队*****************/
Player.prototype.changeTeam = function (color) {
  playerDirector.receiveMessage("changeTeam", this, color); // 给中介者发送消息，玩家换队
};

/*******************定义中介者对象*****************/
let playerDirector = (function () {
  let players = {}, // 保存所有玩家
    operations = {}; // 中介者可以执行的操作
  /****************新增一个玩家***************************/
  operations.addPlayer = function (player) {
    let teamColor = player.teamColor; // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍
    players[teamColor].push(player); // 添加玩家进队伍
  };
  /****************移除一个玩家***************************/
  operations.removePlayer = function (player) {
    let teamColor = player.teamColor, // 玩家的队伍颜色
      teamPlayers = players[teamColor] || []; // 该队伍所有成员
    for (let i = teamPlayers.length - 1; i >= 0; i--) { // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };
  /****************玩家换队***************************/
  operations.changeTeam = function (player, newTeamColor) { // 玩家换队
    operations.removePlayer(player); // 从原队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player);// 增加到新队伍中
  };
  /****************玩家死亡***************************/
  operations.playerDead = function (player) { // 玩家死亡
    let teamColor = player.teamColor,
      teamPlayers = players[teamColor]; // 玩家所在队伍
    let all_dead = true;
    for (let i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== "dead") {
        all_dead = false;
        break;
      }
    }
    if (all_dead === true) {// 全部死亡
      for (let i = 0, player; player = teamPlayers[i++];) {
        player.lose(); // 本队所有玩家 lose
      }
      for (let color in players) {
        if (color !== teamColor) {
          let teamPlayers = players[color];  // 其他队伍的玩家
          for (let i = 0, player; player = teamPlayers[i++];) {
            player.win(); // 其他队伍所有玩家 win
          }
        }
      }
    }
  };

  let receiveMessage = function () {
    let message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };
  return {
    receiveMessage: receiveMessage,
  };
})();

/*******************设置工厂函数*****************/
let playerFactory = function (name, teamColor) {
  let newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象
  playerDirector.receiveMessage("addPlayer", newPlayer); // 给中介者发送消息，新增玩家
  return newPlayer;
};

//红队
let player1 = playerFactory("皮蛋", "red"),
  player2 = playerFactory("小乖", "red"),
  player3 = playerFactory("宝宝", "red"),
  player4 = playerFactory("小强", "red");
// 蓝队:
let player5 = playerFactory("黑妞", "blue"),
  player6 = playerFactory("葱头", "blue"),
  player7 = playerFactory("胖墩", "blue"),
  player8 = playerFactory("海盗", "blue");

player1.die();
player2.die();
player3.die();
player4.die();
