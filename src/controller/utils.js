/**
 * @description utils
 * @author rong
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//文件最大体积
const MIX_SIZE = 1024 * 1024 * 1024
//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 *
 * @param {String} name 文件名
 * @param {String} size 文件大小
 * @param {String} type 文件类型
 * @param {String} filePath 文件路径
 */
async function saveFile({ name, size, type, filePath }) {
    if (size > MIX_SIZE) {
        //移除
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    //移动文件
    const fileName = Date.now() + '.' + name //防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    //返回信息   ‘/2.png’
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}
