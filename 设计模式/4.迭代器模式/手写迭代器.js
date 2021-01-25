// ������������������������⼯��
function iteratorGenerator(list) {
  // idx��¼��ǰ���ʵ�����
  let idx = 0;
  // len��¼���뼯�ϵĳ���
  const len = list.length;
  return {
    // �Զ���next����
    next: function() {
      // ���������û�г������ϳ��ȣ�doneΪfalse
      const done = idx >= len;
      // ���doneΪfalse������Լ���ȡֵ
      const value = !done ? list[idx++] : undefined;

      // ����ǰֵ������Ƿ���ϣ�done������
      return {
        done: done,
        value: value
      }
    }
  }
}

let iterator = iteratorGenerator([1, 2, 3])
iterator.next()
iterator.next()
iterator.next()
