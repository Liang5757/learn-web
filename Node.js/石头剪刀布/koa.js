const fs = require('fs');
const game = require('./game')
const koa = require('koa');
const mount = require('koa-mount')

// ���ʤ���������������3����������÷����������󶼷���500
let playerWinCount = 0
// ��ҵ���һ����Ϸ����
let lastPlayerAction = null;
// ���������ͬһ�������Ĵ���
let sameCount = 0;

const app = new koa();

app.use(
  mount('/favicon.ico', function (ctx) {
    // koa��express���˸����µ�response������
    // ��Ϊkoaʹ���첽������Ϊ�м����ʵ�ַ�ʽ
    // ����koa�����ڵȴ������м��ִ�����֮����ͳһ������ֵ����˿����ø�ֵ�����
    ctx.status = 200;
  })
)

const gameKoa = new koa();
app.use(
  mount('/game', gameKoa)
)
gameKoa.use(
  async function (ctx, next) {
    if (playerWinCount >= 3) {
      ctx.status = 500;
      ctx.body = '�Ҳ��������ˣ�'
      return;
    }

    // ʹ��await �ؼ��ֵȴ������м��ִ�����
    await next();

    // ���ܻ��һ��׼ȷ�����ģ��Ч��
    if (ctx.playerWon) {
      playerWinCount++;
    }
  }
)
gameKoa.use(
  async function (ctx, next) {
    const query = ctx.query;
    const playerAction = query.action;

    if (!playerAction) {
      ctx.status = 400;
      return;
    }

    if (sameCount === 9) {
      ctx.status = 500;
      ctx.body = '�Ҳ��������ˣ�'
    }

    if (lastPlayerAction === playerAction) {
      sameCount++
      if (sameCount >= 3) {
        ctx.status = 400;
        ctx.body = '�����ף�����Ҳ������'
        sameCount = 9
        return;
      }
    } else {
      sameCount = 0;
    }
    lastPlayerAction = playerAction;
    ctx.playerAction = playerAction
    await next();
  }
)
gameKoa.use(
  async function (ctx, next) {
    const playerAction = ctx.playerAction;
    const result = game(playerAction);

    // ����һ����Ҫ����������������ɵĲ�����һ��Ҫʹ��await���еȴ�
    // ����koa�ͻ��ڵ�ǰ�¼�ѭ���Ͱ�http response���س�ȥ��
    await new Promise(resolve => {
      setTimeout(() => {
        ctx.status = 200;
        if (result === 0) {
          ctx.body = 'ƽ��'
        } else if (result === -1) {
          ctx.body = '������'
        } else {
          ctx.body = '��Ӯ��'
          ctx.playerWon = true;
        }
        resolve();
      }, 500)
    })
  }
)

app.use(
  mount('/', function (ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
  })
)
app.listen(3000);
