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

/**
 *数据模板转换
 * @param {array} blogList 微博列表数组
 * @param {boolean} canReply 是否回复
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}
