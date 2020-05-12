/**
 * @description user services
 * @author rong
 */

const { User } = require('../db/model/index')
const { fotmatUser } = require('./_format')

/**
 *获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }
    //数据格式化
    const formatRes = fotmatUser(result.dataValues)
    return formatRes
}

module.exports = {
    getUserInfo
}
