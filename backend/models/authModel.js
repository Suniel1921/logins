const mongoose = require ("mongoose");

const authSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "Name is required"],
        trim: true,
    },
    email: {
        type : String,
        required : [true, "Email is required"],
        trim: true,
    },
    password: {
        type: String,
        required : [true, "Password is required"],
        trim: true,
    },
    role : {
        type : Number,
        default : 0,
    },
    otp: {
        type: Number,
        required: true,
      },
      isVerified: {
        type: Boolean,
      },

}, {timestamps: true})

const authModel = mongoose.model('authModel', authSchema);
module.exports = authModel;