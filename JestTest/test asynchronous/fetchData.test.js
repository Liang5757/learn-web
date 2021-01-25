import { fetchData } from './fetchData'

// ������ô��������Գɹ�����Ϊjest����һ��ִ�е�ĩβ�ͻ����
// ������������һ��fetchDataִ�н������˲��Ծ���û�õ��ûص�����ǰ����
test('fetchData ��������1', () => {
  fetchData().then(response => {
    expect(response.data).toEqual({
      success: true,
    })
  })
})

test('fetchData ��������2', (done) => {
  fetchData().then(response => {
    expect(response.data).toEqual({
      success: true,
    })
    done(); // Jest��� done �ص�����ִ�н����󣬽�������
  })
})

test('fetchData catch��������', () => {
  // expect.assertions(1) // ���ԣ�����ִ��һ��export�������ִ���򱨴�
  // ������Ӷ��ԣ���ô���û�д����򲻻�ת��catch�в���
  fetchData().catch(err => {
    expect(err.toString().indexOf('404') > -1).toBe(true);
  })
})

// �������await���в��ԵĻ�������ʹ��export��resolves��rejects
test('fetchData async����', async () => {
  await expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true,
    }
  })
})
