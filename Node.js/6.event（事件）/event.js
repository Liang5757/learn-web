// node.js ���첽ִ�д���ģ�server��һֱ������������ȴ���д����
// �����Ϳ��ܻᵼ����һ�������ò������������ִ�н��

// ��ʽһ��callback
const fs = require('fs')
console.log(1)  // ��ִ��
const getText1 = (callback) => {
  fs.readFile('./test.txt', (err, data) => {
    if (err) {
      console.log(err.code)
      return
    }
    callback(data)  // ��ȡtest.txt�����ݣ����ִ��
  })
}
getText1((text) => {
  console.log(text.toString())
})
console.log(3)  // ��ִ��


// ��������ͨ���¼��󶨴����ķ�ʽ����첽ִ�����̵�����
// ���� events ģ�飬 Node �ж�����õ��¼������ǿ���ͨ������ events ģ�飬��ͨ��ʵ���� EventEmitter �����󶨺ͼ����¼���
const events = require("events")

const EventEmitter = new events.EventEmitter()

const getText2 = () => {
  fs.readFile('./test.txt', (err, data) => {
    if (err) {
      console.log(err.code)
      return
    }
    EventEmitter.emit('data', data)  // ���ִ��
  })
}

getText2();

// ����data
EventEmitter.on('data', (text) => {
  console.log(text.toString())
})
