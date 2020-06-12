/**
 * @description 数据格式化
 * @author rong
 */
const { DEFAULT_PICEUER } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')
/**
 *用户默认头像
 * @param {object} obj 用户对象(内部使用)
 */
function _formatUserPictuer(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICEUER
    }
    return obj
}

/**
 * 格式化用户
 * @param {Array|Object} list 用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    //是否数组
    if (list instanceof Array) {
        //数组  用户列表
        return list.map(_formatUserPictuer)
    }

    //单个用户对象
    return _formatUserPictuer(list)
}

function _formatDBRTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}
/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        //数组
        return list.map(_formatDBRTime)
    }
    //对象
    return _formatDBRTime(list)
}

module.exports = {
    formatUser,
    formatBlog
}
