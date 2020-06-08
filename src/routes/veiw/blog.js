/**
 * @description  创建微博
 * @author rong
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginchecks')

router.get('/', loginRedirect, async (ctx, next) => {
    //  第一个参数是文件名
    await ctx.render('index', {})
})

module.exports = router
