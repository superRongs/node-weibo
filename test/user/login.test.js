/**
 * @description user api test
 * @author rong
 */

const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

//
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

//cookie
let Cookie = ''

//注册
test('注册一个客户，应该成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

//重复注册
test('重复注册一个用户，应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

//是否重复用户名
test('查询用户的存在, 应该存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.errno).toBe(0)
})

//json schema 验证
test('json schema检验验证  非法的格式，注册应该失败', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123', //userName不能为数字
        password: 'a', //password不能少于3位
        // nickName: '',
        gender: 'fasd' //gender只能为数字
    })

    expect(res.body.errno).not.toBe(0)
})

//登录
test('用户登录，应该成功', async () => {
    const res = await server.post('/api/user/login').send({
        userName,
        password
    })
    expect(res.body.errno).toBe(0)

    Cookie = res.headers['set-cookie'].join(';')
})

//修改基础信息
test('修改基础信息，应该成功', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '修改昵称',
            city: '修改城市',
            picture: '/test.png'
        })
        .set('cookie', Cookie)
    expect(res.body.errno).toBe(0)
})

//修改密码
test('修改密码应该成功', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('cookie', Cookie)

    expect(res.body.errno).toBe(0)
})

//删除
test('删除用户，应该成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', Cookie)
    expect(res.body.errno).toBe(0)
})

//退出登录   (为什么退出登录在删除后面  因为退出登录后   session会被删除掉  所以删除接口就会报错)
test('退出登录，应该成功', async () => {
    const res = await server.post('/api/user/logout').set('cookie', Cookie)
    expect(res.body.errno).toBe(0)
})

//再次查询客户
test('再次查询客户  应该失败', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.errno).not.toBe(0)
})
