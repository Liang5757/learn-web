// entry-server.js
import { createApp } from './app'

export default context => {
  // ��Ϊ�п��ܻ����첽·�ɹ��Ӻ�����������������ǽ�����һ�� Promise��
  // �Ա�������ܹ��ȴ����е���������Ⱦǰ��
  // ���Ѿ�׼��������
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    
    // ���÷������� router ��λ��
    router.push(context.url)
    
    // �ȵ� router �����ܵ��첽����͹��Ӻ���������
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // ƥ�䲻����·�ɣ�ִ�� reject ������������ 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      
      // Promise Ӧ�� resolve Ӧ�ó���ʵ�����Ա���������Ⱦ
      resolve(app)
    }, reject)
  })
}
