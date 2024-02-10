const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const {cloudinaryConfig } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middlewares
const app = express();
app.use(express.json())
app.use(cors())
// TODO: set allow list when required
// app.use(
// 	cors({
// 		origin:process.env.ALLOW_LIST,
// 		credentials:true,
// 	})
// )
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

// import api routes 
const userRoutes = require("./routes/User");
const planRoutes = require("./routes/Plan");

// mount api routes 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/plan", planRoutes);


app.listen(PORT,()=>{
    console.log(`server started successfully on port ${PORT}`);
})

const dbConnect = require('./config/database')
dbConnect();
//cloudinary connection
cloudinaryConfig();


app.get('/', (req, res)=>{
    res.send('<h1>HaveMeal - Backend</h1>')
})
