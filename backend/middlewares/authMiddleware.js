const JWT = require("jsonwebtoken");
const authModel = require("../models/authModel");

// exports.requireLogin = async (req, res, next) => {
//     try {
//         // Assuming req._id is the user ID you want to use in the token
//         const token = req.header("Authorization").replace("Bearer ", "");
//         const decode = JWT.verify(token, process.env.SECRET_KEY);
        
//         req.user = decode; // Assuming you want to attach the user data to the request object
//         next();
//     } catch (error) {
//         return res.status(500).send({ success: false, message: "Something went wrong!" });
//     }
// }

// ******OR*********

//*********************PROTECT ROUTES USING TOKEN *******************
exports.requireLogin = async (req, res, next)=>{

    // Get the token from the request headers
    const token = req.header('Authorization');

    // Check if the token is present
    if(!token){
        return res.status(401).send({success: false, message: "Unauthrized ! Login First"})
    }

    try {
        const decoded = JWT.verify(token.replace("Bearer", "") ,process.env.SECRET_KEY);
        // Attach the user information to the request object for further use
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).send({success: false, message: "Unauthorized: Invalid token!"});        
    }
}


// *********************ISADMIN*******************************
exports.isAdmin = async (req, res, next)=>{
    try {
        const user = await authModel.findById(req.user._id);
        if (!user || user.role !== 1){
            return res.status(401).send({success: false, message: "You do not have permission to access this resource."})
        }
        else{
            next()
        }
        
    } catch (error) {
        return res.status(401).send({success: false, message: "Unauthorized Access. Please log in and try again!"})
        
    }
}



