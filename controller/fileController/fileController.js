const fs = require('fs')
const uploadFile = require("../../middleware/index").upload.uploadFileMiddleware;
const queryService = require('../../services/queryService/queryService');
const db = require('../../database/mongo/connection');
const Schema = db.mongoose.Schema;


/**
   * Use to upload csv file to and make collection for same csv and saving file details to db
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
const upload = async (req, res) => {
    try {

        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        } else if (await queryService.check(req.file.originalname)) {
            return res.status(400).send({ message: "file Already Uploaded" })
        }
        else if (req.file.mimetype == "text/csv") {
            const directoryPath = __basedir + "/public/uploads/" + req.file.originalname;
            const readline = require("readline");
            const stream = fs.createReadStream(directoryPath);
            const rl = readline.createInterface({ input: stream });
            let data = [];

            rl.on("line", (row) => {
                data.push(row);
            });

            rl.on("close", () => {

                let first = data[0]
                first = first
                    .split(';')
                    .join(',')
                    .split(',')
                    .join(',') //
                first = first.split(',')

                let schemaObject = {}
                schemaObject.updatedAt = {
                    type: Date,
                    default: Date.now
                }
                for (const key of first) {
                    schemaObject[key] = {
                        type: String
                    }
                }

                const fileStorgageSchema = new Schema(schemaObject);

                const fileStorageModel = db.mongoose
                    .model('fileStorageModel'+req.file.originalname+'',
                        fileStorgageSchema,
                        req.file.originalname);

                for (let i = 1; i < data.length; i++) {
                    let temp = data[i]
                    temp = temp
                        .split(';')
                        .join(',')
                        .split(',')
                        .join(',')
                    temp = temp.split(',')
                    const obj = Object.fromEntries(
                        first.map((entity, j) => [entity, temp[j]])
                    )
                    let dataObj = new fileStorageModel(obj)
                    dataObj.save()
                }
            });
            let fileData = {}

            fileData.fileName = req.file.originalname
            fileData.fileType = req.file.mimetype
            fileData.fileSize = (req.file.size) / 1024
            fileData.filePath = req.file.path
            await queryService.insert(fileData)

            res.status(200)
                .send({ message: "collection created with name " + req.file.originalname })

        } else {
            return res.status(400)
                .send({ message: "invalid file" });
        }

    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file -  ${err}`,
        });
    }
};



module.exports = {
    upload
};
