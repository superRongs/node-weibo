const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        name: 'qing',
        isShow: false,
        blogList: [{
            id: 1,
            content: 'aaa'
        }, {
            id: 2,
            content: 'bbb'
        }, {
            id: 3,
            content: 'ccc'
        },]
    })
})

router.get('/json', async (ctx, next) => {
    // const session = ctx.session
    // if (session.viewNum == null) {
    //     session.viewNum = 0
    // }
    // session.viewNum++

    ctx.body = {
        title: 'koa2 json',
        // viewNum: session.viewNum
    }
})

router.get('/prefix/:username', async (ctx, next) => {
    const { username } = ctx.params
    ctx.body = {
        mgs: 'this is prefix and username',
        username
    }
})

module.exports = router
