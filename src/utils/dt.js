/**
 * @description 时间相关工作函数
 * @author rong
 */

const { format } = require('date-fns')

/**
 * 时间转换格式  02.05 14:33
 * @param {string} str 时间字符创
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat
}
