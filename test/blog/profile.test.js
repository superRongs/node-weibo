/**
 * @description profile api
 * @author rong
 */
const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo')

test('微博个人主页，应该成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${USER_NAME}/0`)
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    //新方法
    const data = res.body.data
    //toHaveProperty   查询是否包含该字段
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})
