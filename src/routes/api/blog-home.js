/**
 * @description 微博首页路由
 * @author rong
 */

const router = require('koa-router')()
const { logincheck } = require('../../middlewares/loginchecks')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', logincheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})

module.exports = router
