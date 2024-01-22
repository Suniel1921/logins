const authModel = require("../models/authModel");
const bcrypt = require ("bcrypt");
const JWT = require ("jsonwebtoken");

//register controller
exports.register = async (req, res)=>{
    try {
        const {name,email,password} = req.body;
        //validation
        if(!name || !email || !password){
            return res.status(406).send({success: false, message: "All Fields are required !"});
        }
        //check user Email exit or not in our db
        const userExit = await authModel.findOne({email});
        if(userExit){
            return res.status(400).send({success: false, message: "user already Exit !"});
        }

        //hashing user password
        const hashPassword = await bcrypt.hash(password, 10);

        //saving new user in database
        const newUser = await authModel.create({name,email,password:hashPassword});
        return res.status(201).send({success: true, message: "Singup Successfully", newUser:{
            name : newUser.name,
            email: newUser.email,
            password : newUser.password,
        }});

        
    } catch (error) {
        return res.status(500).send({success: false, message: "Error while registering user"});        
    }
}


//login controller

exports.login = async (req, res)=>{
    try {
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(406).send({success: false, message: "All Fields are required !"}); 
        }
        //check user email exit or not in db
        const userExit = await authModel.findOne({email});
        if(!userExit){
            return res.status(404).send({success: false, message: "Wrong Credentials !"});
        }

        //check password match or not with user entering and db store password
        const passMatch = await bcrypt.compare(password, userExit.password);
        if(!passMatch){
            return res.status(400).send({success: false, message: "Wrong Credentials !"});
        }
        
        //generate token
        const token = await JWT.sign({_id: userExit._id}, process.env.SECRET_KEY, {expiresIn: '7d'});
        return res.status(200).send({success: true, message: "Login Successfully", userExit:{
            name : userExit.name,
            email: userExit.email,
        }, token});
        
    } catch (error) {
        return res.status(500).send({success: false, message: "Error while logging user"});              
    }
}


//protected routes
exports.protectedRoute = async (req, res)=>{
    res.status(200).send({ok: true});

}

exports.admin = (req, res)=>{
    res.send("welcome to the admin page")

}









