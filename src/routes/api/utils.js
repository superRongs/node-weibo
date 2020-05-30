/**
 * @description utils app 图片上传
 * @author rong
 */

const router = require('koa-router')()
const { logincheck } = require('../../middlewares/loginchecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', logincheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file

    ctx.body = await saveFile({
        name,
        size,
        type,
        filePath: path
    })
})

module.exports = router
