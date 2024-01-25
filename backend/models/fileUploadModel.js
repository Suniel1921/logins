// fileUploadModel.js
const mongoose = require ("mongoose");

const fileUploadSchema = new mongoose.Schema({
  authUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authModel',
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'categoryModel',
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
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

}, { timestamps: true });

const fileUploadModel = mongoose.model("fileUploadModel", fileUploadSchema);
module.exports = fileUploadModel;
