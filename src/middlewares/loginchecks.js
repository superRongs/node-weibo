/**
 * @description 登录验证的中间件
 * @author rong
 */

const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * API登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function logincheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    let curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    logincheck,
    loginRedirect
}
