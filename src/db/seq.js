/**
 * @description sequelize 实例
 * @author rong
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, port, database } = MYSQL_CONF
//什么是ORM（对象关系映射）
// 即Object-Relationl Mapping，它的作用是在关系型数据库和对象之间作一个映射，这样，我们在具体的操作数据库的时候，就不需要再去和复杂的SQL语句打交道，只要像平时操作对象一样操作它就可以了 。

const conf = {
    host,
    //数据库类型
    dialect: 'mysql'
}
if (isTest) {
    conf.loggin = () => {}
}
//数据库连接池   （线上环境使用连接池，线下不用）
if (isProd) {
    conf.pool = {
        max: 5, //连接池最大连接数量
        min: 0, //最小
        idle: 10000 //如果一个连接池10秒内没有诶使用。释放
    }
}

//四个参数    1、数据库名称   2、数据库账户名  3、数据库密码   4、配置
const seq = new Sequelize(database, user, password, conf)

//连接测试
// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('err')
// })

module.exports = seq
