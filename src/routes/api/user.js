/**
 * @description user接口
 * @author rong
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

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

module.exports = router
