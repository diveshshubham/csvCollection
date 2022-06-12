const fileModel = require('../../models/index').fileModel
const insert = async (data) => {
    try {
        const fileName = data.fileName
        const fileType = data.fileType
        const fileSize = data.fileSize
        const filePath = data.filePath

        let fileObj = new fileModel({
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            filePath: filePath,
        })
        await fileObj.save()
    } catch (err) {
        console.log(err)
    }
}

const check = async (data) => {
    try {
        console.log(data)
        const condition = { fileName: data }
        let check = await fileModel.findOne(condition)
        console.log(check)
        if (check) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    insert: insert,
    check: check,
   
}
