/**
 * @description user controller
 * @author rong
 */
const { getUserInfo, createUser } = require('../services/user')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 验证用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    //业务逻辑处理
    //调用service获取数据
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        //已存在
        return new SuccessModel(userInfo)
    } else {
        //未存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
    //统一返回格式
}

/**
 *创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    //判断客户名是否已存在
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (error) {
        console.error(error.message)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}
