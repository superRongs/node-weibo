/**
 * @description 微博相关数据的工具方法
 * @author rong
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const BLOG_LIST_TPL = fs
    .readFileSync(
        path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
    )
    .toString()

function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}
