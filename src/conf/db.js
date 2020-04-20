/**
 * @description  redis配置
 * @author rong 
 * */
const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'qing0324',
    port: '3306',
    database: 'koa2_weibo'
}

if (isProd) {
    //线上环境redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'qing0324',
        port: '3306',
        database: 'koa2_weibo'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}