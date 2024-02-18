const express = require ("express");
const app = express();
//import statement 
const dotenv = require ("dotenv");
const dbConnection = require ("./config/database");
const cors = require ("cors");
const authRoute = require ("./routes/authRoute");
const categoryRoute = require ("./routes/categoryRoute");
const fileUpload = require ("./routes/fileUploadRoute");

//express file upload
const fileupload = require ("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir : '/tmp.'
}));

//connect with cloudinary
const cloudinary = require ("./config/cloudinary");
cloudinary.cloudinaryConnect();


//dotenv configuration
dotenv.config();
const PORT = process.env.PORT || 8000;

//calling database
dbConnection();

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use('/api/v1/upload', fileUpload);



//default routes 
app.get("/",(req ,res)=>{
    res.send("<h2>Welcome to Hamro Rooms 😊#Keep Smiling</h2>");
})


app.listen(PORT,()=>{
    console.log(`Server is running on port no : ${PORT}`);
})

