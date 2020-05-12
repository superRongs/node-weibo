/**
 * @description res数据模型
 * @author rong
 */

//  基础数据模型
class baseModel {
    constructor({ error, data, message }) {
        this.error = error
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
            error: 0,
            data
        })
    }
}

//失败数据模型
class ErrorModel extends baseModel {
    constructor({ error, message }) {
        super({ error, message })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
