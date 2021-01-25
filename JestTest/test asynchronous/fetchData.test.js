import { fetchData } from './fetchData'

// 无论怎么样都会测试成功，因为jest测试一旦执行到末尾就会完成
// 所以问题再与一旦fetchData执行结束，此测试就在没用调用回调函数前结束
test('fetchData 方法测试1', () => {
  fetchData().then(response => {
    expect(response.data).toEqual({
      success: true,
    })
  })
})

test('fetchData 方法测试2', (done) => {
  fetchData().then(response => {
    expect(response.data).toEqual({
      success: true,
    })
    done(); // Jest会等 done 回调函数执行结束后，结束测试
  })
})

test('fetchData catch方法测试', () => {
  // expect.assertions(1) // 断言，必须执行一次export，如果不执行则报错
  // 如果不加断言，那么如果没有错误，则不会转到catch中测试
  fetchData().catch(err => {
    expect(err.toString().indexOf('404') > -1).toBe(true);
  })
})

// 如果是用await进行测试的话，可以使用export的resolves和rejects
test('fetchData async方法', async () => {
  await expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true,
    }
  })
})
