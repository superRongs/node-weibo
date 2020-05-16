/**
 * @description 用户登录
 * @author rong
 */

const router = require('koa-router')()

/**
 * 是否登录
 * @param {object} ctx
 */
function getIsLogin(ctx) {
    let userInfo = {
        isLogin: false
    }
    const user = ctx.session.userInfo
    if (user) {
        userInfo = {
            isLogin: true,
            userName: user.userName
        }
    }
    return userInfo
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getIsLogin(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getIsLogin(ctx))
})

module.exports = router
