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

/**
 *
 * @param {Object} 修改新的参数  新的密码   新的昵称   新的图片   新的城市
 * @param {Object} 查询条件    userName  password
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    //拼接修改内容
    let upDateData = {}
    if (newPassword) {
        upDateData.password = newPassword
    }
    if (newNickName) {
        upDateData.nickName = newNickName
    }
    if (newPicture) {
        upDateData.picture = newPicture
    }
    if (newCity) {
        upDateData.city = newCity
    }

    //拼接查询条件
    let whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    //执行修改
    const result = await User.update(upDateData, {
        where: whereData
    })

    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
