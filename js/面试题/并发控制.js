/**
 * @params list {Array} - Ҫ����������
 * @params limit {Number} - ��������������
 * @params asyncHandle {Function} - ��`list`��ÿһ����Ĵ�����������Ϊ��ǰ��������� return һ��Promise��ȷ���Ƿ�������е���
 * @return {Promise} - ����һ�� Promise ֵ��ȷ�����������Ƿ�������
 */
function asyncControl (list, limit, asyncHandle) {
  let recursion = arr => {
    return asyncHandle(arr.shift()).then(() => {
      if (arr.length !== 0) return recursion(arr); // ���黹δ�����꣬�ݹ�������е���
      else return "finish";
    })
  }
  
  let asyncList = []; // ���ڽ��е����в����첽����
  while (limit--) {
    asyncList.push(recursion(list));
  }
  return Promise.all(asyncList); // ���в����첽��������ɺ󣬱��β������Ƶ������
}

let dataLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 100, 123];
let count = 0;
asyncControl(dataLists, 3, curItem => {
  return new Promise(resolve => {
    count++
    setTimeout(() => {
      console.log(curItem, "��ǰ������:", count--)
      resolve();
    }, Math.random() * 5000)
  });
}).then(response => {
  console.log("finish", response)
})
