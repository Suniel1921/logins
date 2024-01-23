const fileUploadModel = require("../models/fileUploadModel");

const cloudinary = require ("cloudinary").v2;


function isFileSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    options.resource_type = 'auto'
    //for compress image quality
    if(quality){
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

//crate room controller(post method) 
exports.imageUpload = async (req ,res)=>{
    try {
        const {city, address, phone, rent} = req.body;
        // console.log(city, address, phone, rent);

        const file = req.files.imageFile;
        // console.log('image file is : ', file);
       

        //validation
        const supportedTypes = ['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        // console.log('file Type : ', fileType);

        if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).send({ success: false, message: 'File format not supported'})
        }

        //file format supported hai tab
        // console.log('uploading file ')
        const response = await uploadFileToCloudinary(file, "userRoomImg",30); //here is 30 for image compressor you can use also 10, 20, 40, 60 , 90...
        // console.log(response);

        //db me entry save karni hai 
        const fileData = await fileUploadModel.create({city,address,phone, rent, imageUrl: response.secure_url})
        res.status(200).send({success: true, message: 'Thanks for posting your room.', fileData})
        
    } catch (error) {
        return res.status(500).send({success: false, message: `Error while uploading image ${error}`})
        
    }
}






//get all posted room controller (get mothod)
exports.getAllRoom = async (req, res)=>{
    try {
        const allRoom = await fileUploadModel.find().populate('city');
        // console.log("All Room Data:", allRoom);
        if(!allRoom){
            return res.status(404).send({success: false, message: "Room Details Not Found !"});
        }
        return res.status(200).send({success: true, message: "All Room Details Fetched !", allRoom});
        
    } catch (error) {
        return res.status(500).send({success: false, message : "Internal Server Error"});        
    }
}

//get single post room 
exports.getSingleRoom = async (req, res)=>{
    try {
        const {id} = req.params;
        const singleRoom = await fileUploadModel.findById(id);
        if(!singleRoom){
            return res.status(404).send({success: false, message: "No single room found !"});
        }        
        return res.status(200).send({success: true, message: "single room fetched", singleRoom})
        
    } catch (error) {
        return res.status(500).send({success: false, message : "Error while getting single room details"})
        
    }
}


//upload room controller (put method)
exports.updateRoom = async (req ,res)=>{
    try {
        const {address, phone, rent} = req.body;
        const {id} = req.params;
        const updateRoom = await fileUploadModel.findByIdAndUpdate(id,{address,phone,rent}, {new: true});
        return res.status(200).send({success: true, message: "Room details updated successfully !", updateRoom});
        
    } catch (error) {
        return res.status(500).send({success: false, message : "Error while updating  room details"})
        
    }
}

//delete room controller (delete method)
exports.deleteRoom = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteRoom = await fileUploadModel.findByIdAndDelete(id);
        if(!deleteRoom){
            return res.status(404).send({success: false , message : "Room Not Found !"});
        }
        return res.status(200).send({success: true, message: "Room Delted Successfully"})
        
    } catch (error) {
        return res.status(500).send({success: false, message : "Error while deleting room details"})
        
    }
}



//search functionality


// Search rooms by address
exports.searchRoomByAddress = async (req, res) => {
    try {
      const { address } = req.query;
  
      // Use a regular expression for case-insensitive search
      const query = { address: { $regex: new RegExp(address, 'i') } };
  
      const searchResults = await fileUploadModel.find(query);
  
      if (searchResults.length === 0) {
        return res.status(404).json({ success: false, message: "No matching rooms found." });
      }
  
      return res.status(200).json({ success: true, message: "Rooms found successfully.", searchResults });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server Error." });
    }
  };


  //get how many room posted by user show on their account
//   exports.userRoomCount = async (req, res) => {
//     try {
//         const userId = req.query.userId;
//         const rooms = await fileUploadModel.find({ user: userId });
//         res.status(200).json({ success: true, message: "User rooms fetched", rooms });
//       } catch (error) {
//         console.error('Error fetching user rooms:', error);
//         res.status(500).json({ success: false, message: "Internal Server Error." });
//       }
//   };
  


