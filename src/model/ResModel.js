/**
 * @description res数据模型
 * @author rong
 */

//  基础数据模型
class baseModel {
    constructor({ errno, data, message }) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

//成功数据模型
class SuccessModel extends baseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

//失败数据模型
class ErrorModel extends baseModel {
    constructor({ errno, message }) {
        super({ errno, message })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
