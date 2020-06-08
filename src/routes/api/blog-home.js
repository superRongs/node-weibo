/**
 * @description 微博首页路由
 * @author rong
 */

const router = require('koa-router')()
const { logincheck } = require('../../middlewares/loginchecks')
const { create } = require('../../controller/blog-home')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/blog')

//微博创建
router.post(
    '/create',
    logincheck,
    genValidator(blogValidate),
    async (ctx, next) => {
        const { content, image } = ctx.request.body
        const { id: userId } = ctx.session.userInfo
        ctx.body = await create({ userId, content, image })
    }
)

module.exports = router
