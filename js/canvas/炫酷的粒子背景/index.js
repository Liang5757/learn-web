let ctx = document.getElementById('canvas'),
  content = ctx.getContext('2d'),
  WIDTH,
  HEIGHT,
  round = [],
  initRoundPopulation = 80;

WIDTH = document.documentElement.clientWidth;
HEIGHT = document.documentElement.clientHeight;

ctx.width = WIDTH;
ctx.height = HEIGHT;

// 粒子
class Round_item {
  constructor(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,255,255," + alpha + ")";
  }

  // 绘制粒子
  draw() {
    content.fillStyle = this.color;
    content.shadowBlur = this.r * 2;
    content.beginPath();
    content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    content.closePath();
    content.fill();
  }

  move() {
    this.y -= 0.20;
    if (this.y <= -10) {
      this.y = HEIGHT + 10;
    }
    this.draw();
  };
}

// 初始化粒子
function init() {
  for (let i = 0; i < initRoundPopulation; i++) {
    round[i] = new Round_item(i, Math.random() * WIDTH, Math.random() * HEIGHT);
    round[i].draw();
  }
  animate();
}

function animate() {
  content.clearRect(0, 0, WIDTH, HEIGHT);

  for (let i in round) {
    if (round.hasOwnProperty(i)) {
      round[i].move();
    }
  }
  requestAnimationFrame(animate);
}

init();
