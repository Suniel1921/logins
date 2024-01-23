const mongoose = require ("mongoose");

const fileUploadSchema = new mongoose.Schema({

    city : {
        type : mongoose.Types.ObjectId,
        required: true,
        ref : 'categoryModel',
    },
    // city : {
    //     type : String,
    //     required : true,
    // },
    address : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    rent : {
        type : Number,
        required : true,
    },
    imageUrl : {
        type: String,
    },

    //for room key features
    parking: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
    },
    water: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
    },
    floor: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th', '5th'],
        required: true,
    },
    
})

const fileUploadModel = mongoose.model("fileUploadModel", fileUploadSchema);
module.exports = fileUploadModel;





