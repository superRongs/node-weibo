/**
 * @description user controller
 * @author rong
 */
const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../services/user')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo
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

/**
 *用户登录
 * @param {object} ctx koa ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

async function changeInfo(ctx, { nickName, picture, city }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = nickName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newPicture: picture,
            newCity: city
        },
        {
            userName
        }
    )

    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            picture,
            city
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}
