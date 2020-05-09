/**
 * @description 数据类型模型
 * @author rong
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    BOOLEAN: Sequelize.BOOLEAN,
    INTEGER: Sequelize.INTEGER
}
