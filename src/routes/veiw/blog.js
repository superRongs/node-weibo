/**
 * @description  创建微博
 * @author rong
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginchecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
    //  第一个参数是文件名
    await ctx.render('index', {})
})
//个人页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    //已登录客户信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    //获取头部属性
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        //当前用户信息
        curUserInfo = myUserInfo
    } else {
        //如果不是   先去数据库查询这个用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            return
        }
        //其他客户信息
        curUserInfo = existResult.data
    }

    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    //profile 对应文件  view/profile.ejs
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})

module.exports = router
