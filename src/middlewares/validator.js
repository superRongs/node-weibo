/**
 * @description  校验中间件
 * @author rong
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 校验方法
 * @param {function} validateFn 校验函数
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }
    return validator
}

module.exports = {
    genValidator
}
