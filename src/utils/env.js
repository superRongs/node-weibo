/**
 * @description   环境配置
 * @author   rong
 */

const ENV = process.env.NODE.ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
}