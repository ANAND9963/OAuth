const bodyparser = require("body-parser");
require('dotenv').config();

const express = require("express");

const server = express();

const cors = require("cors");

server.use(cors());
const mongoose = require("mongoose");

server.use(bodyparser.json());

const PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise;


const uri = `${process.env.REACT_APP_MOVIE_DB_URL}`;



const mongodb = mongoose.connect(uri).then(()=>{
    console.log("db is connected");
    
}).catch((error)=>{
    console.log(error,"db is not connected");
})

const userRoutes = require("../users/router");
userRoutes(server);


server.listen(PORT , () =>{
    console.log(`server is running ${PORT}`);
    
})



