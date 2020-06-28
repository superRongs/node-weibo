/**
 * @description 加载更多路由
 * @author rong
 */
const router = require('koa-router')()
const { logincheck } = require('../../middlewares/loginchecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
router.prefix('/api/profile')
const { getBlogListStr } = require('../../utils/blog')

router.get('/loadMore/:userName/:pageIndex', logincheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    let result = await getProfileBlogList(userName, pageIndex)
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router
