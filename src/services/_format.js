/**
 * @description 数据格式化
 * @author rong
 */
const { DEFAULT_PICEUER } = require('../conf/constant')
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
function fotmatUser(list) {
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

module.exports = {
    fotmatUser
}
