/**
 * @description json schema 检验方法
 * @author rong
 */

const AJV = require('ajv')
const ajv = new AJV({
    //  allErrors: true
})

/**
 * 校验方法
 * @param {object} schema user schema 校验
 * @param {object} data  user用户信息校验
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate
