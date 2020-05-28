/**
 * @description user services
 * @author rong
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

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
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 *创建用户
 * @param {string} userName  用户名
 * @param {string} password  密码
 * @param {number} gender  性别 （1男  2女  3保密）
 * @param {string} nickName  昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    //执行成功 result返回结果为 1
    return result > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
}
