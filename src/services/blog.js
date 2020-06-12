/**
 * @description 微博首页  services
 * @author rong
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    //查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    //执行查询 findAndCountAll
    const result = await Blog.findAndCountAll({
        limit: pageSize, //查询条数
        offset: pageIndex * pageSize, //跳过条数    (分页功能)
        order: [['id', 'desc']],
        //连表查询
        include: [
            {
                model: User, //关联的数据库
                attributes: ['userName', 'nickName', 'picture'], //需要的属性值
                where: userWhereOpts //查询的条件
            }
        ]
    })

    //整理数据
    //result.count 总数，跟分页无关
    //result.rows   查询结果  数组

    //获取dataValues
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const userData = blogItem.user.dataValues
        blogItem.user = formatUser(userData)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}
