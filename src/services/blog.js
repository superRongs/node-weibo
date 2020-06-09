/**
 * @description 微博首页  services
 * @author rong
 */

const { Blog } = require('../db/model/index')

async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}
