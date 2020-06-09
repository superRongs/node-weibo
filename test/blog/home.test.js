/**
 * @description blog api test
 * @author rong
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

let BLOGID = ''

test('创建微博信息，应该成功', async () => {
    const content = '创建内容' + Date.now()
    const image = '/***.png'

    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)
    console.log(res.body)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    BLOGID = res.body.data.userId
})
