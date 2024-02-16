// // fileUploadModel.js
// const mongoose = require ("mongoose");

// const fileUploadSchema = new mongoose.Schema({
//   authUser: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'authModel',
//   },
//   viewCount: {
//     type: Number,
//     default: 0,
//   },
//   city: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'categoryModel',
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },
//   rent: {
//     type: Number,
//     required: true,
//   },
//   imageUrl: {
//     type: String,
//   },
//   parking: {
//     type: String,
//     enum: ['yes', 'no'],
//     required: true,
//   },
//   water: {
//     type: String,
//     enum: ['yes', 'no'],
//     required: true,
//   },
//   floor: {
//     type: String,
//     enum: ['1st', '2nd', '3rd', '4th', '5th'],
//     required: true,
//   },
//   roomType: {
//     type: String,
//     enum: ['single room', 'double room', 'room and kitchen', 'flat'],
//     required: true,
// }



// }, { timestamps: true });

// const fileUploadModel = mongoose.model("fileUploadModel", fileUploadSchema);
// module.exports = fileUploadModel;






const mongoose = require("mongoose");

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
  roomType: {
    type: String,
    enum: ['single room', 'double room', 'room and kitchen', 'flat'],
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const fileUploadModel = mongoose.model("fileUploadModel", fileUploadSchema);
module.exports = fileUploadModel;

// New route/controller for verifying rooms
// exports.verifyRoom = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const room = await fileUploadModel.findById(id);

//     if (!room) {
//       return res.status(404).send({ success: false, message: "Room not found." });
//     }

//     // Only admins can verify rooms
//     if (req.user.role !== 1) {
//       return res.status(403).send({ success: false, message: "You don't have permission to verify rooms." });
//     }

//     // Verify the room
//     room.verified = true;
//     await room.save();

//     return res.status(200).send({ success: true, message: "Room verified successfully.", room });
//   } catch (error) {
//     return res.status(500).send({ success: false, message: "Internal server error." });
//   }
// };
