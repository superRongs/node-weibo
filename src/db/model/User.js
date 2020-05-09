/**
 * @description 数据模型创建
 * @author rong
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

//创建users表
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别 1男   2女   3保密'
    },
    picture: {
        type: STRING,
        allowNull: false,
        comment: '头像，图片地址'
    },
    city: {
        type: STRING,
        allowNull: false,
        comment: '城市'
    }
})

module.exports = User
