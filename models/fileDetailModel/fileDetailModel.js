// Import mongoose database Connection
// MESSAGE MODEL
const db = require('../../database/mongo/connection');
const Schema = db.mongoose.Schema;

const fileDetailsSchema = new Schema({
    'fileName': {
        type: String
    },
    'fileType': {
        type: String, 
    },
    'fileSize': {
        type: Number, 
    },
    'filePath':{
        type : String
    },
    'updatedAt': {
        type: Date,
        default: Date.now
    },
});

const fileDetailModel = db.mongoose.model('fileDetailModel', fileDetailsSchema, 'fileDetail');
module.exports = fileDetailModel;
