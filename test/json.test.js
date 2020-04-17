/**
 * @description json test
 * @author rong
 */

const server = require('./server')

test('json 数据返回正确格式', async () => {
    const res = await server.get('/json')
    //toBe是对值   toEqual是对象
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})