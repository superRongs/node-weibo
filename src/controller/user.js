/**
 * @description user controller
 * @author rong
 */
const { getUserInfo } = require('../services/user')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 用户名是否存在
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

module.exports = {
    isExist
}
