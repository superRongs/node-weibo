const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const REDIS_CONF = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const koaStatic = require('koa-static')

const profileApiRouter = require('./routes/api/blog-profile')
const homeApiRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/veiw/blog')
const utilsApiRouter = require('./routes/api/utils')
const userApiRouter = require('./routes/api/user')
const user = require('./routes/veiw/user')
const errorViewRouter = require('./routes/veiw/error')

// error handler
let onErrorConf = {}
//只有线上才用到跳到错误页
if (isProd) {
    onErrorConf = {
        redirect: '/error'
    }
}
onerror(app, onErrorConf)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '../uploadFiles')))

app.use(
    views(__dirname + '/views', {
        extension: 'ejs'
    })
)

app.keys = [SESSION_SECRET_KEY]
app.use(
    session({
        key: 'weibo.sid', //默认koa.sid
        prefix: 'weibo:sess:', //默认 koa:sess:
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        },
        store: redisStore({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
        })
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
