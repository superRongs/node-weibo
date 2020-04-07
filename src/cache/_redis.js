/**
 * @description 连接redis方法   get set
 * @author rong
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

//set
/**
 * redis设置set
 * @param {STRING} key 键
 * @param {STRING} val   值
 * @param {NUMBER} timeout     redis有效时间
 */
function set(key, val, timeout = 60 * 60) {
    if (type === 'object') {
        val = JSON.stringify(val)
    }
    //设置键值
    redisClient.set(key, val)
    redisClient.expire(timeout)
}


//get
/**
 * redis get
 * @param {STRING} key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                //尝试转换成json对象
                resolve(JSON.parse(val))
            } catch (etx) {
                //当val无法转换成json   则会报错   此时默认输出
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}