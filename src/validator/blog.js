/**
 * @description blog 创建微博 数据校验
 * @author rong
 */
const validate = require('./_validate')

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

/**
 * 校验用户数据模式
 * @param {object} data 用户数据
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate
