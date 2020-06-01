/**
 * @description user接口
 * @author rong
 */

const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { logincheck } = require('../../middlewares/loginchecks')

router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户名是否重复
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    //controller
    ctx.body = await isExist(userName)
})

//用户登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

//删除用户
router.post('/delete', logincheck, async (ctx, next) => {
    if (isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

//更新用户
router.patch(
    '/changeInfo',
    logincheck,
    genValidator(userValidate),
    async (ctx, next) => {
        const { nickName, city, picture } = ctx.request.body
        ctx.body = await changeInfo(ctx, { nickName, picture, city })
    }
)

module.exports = router
