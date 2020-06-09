/**
 * @description 微博首页数据模型  单元测试
 * @author rong
 */

const { Blog } = require('../../src/db/model/index')

test('blog 模型的各个属性，符合预期', () => {
    //build 会构建一个内存的 User实例，但不会提交到数据库中
    const blog = Blog.build({
        userId: 1,
        content: '创建微博',
        image: '/***.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('创建微博')
    expect(blog.image).toBe('/***.png')
})
