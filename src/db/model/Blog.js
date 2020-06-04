/**
 * @description 微博创建数据
 * @author rong
 */

const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comments: '微博 内容'
    },
    image: {
        type: STRING,
        comments: '图片地址'
    }
})

module.exports = Blog
