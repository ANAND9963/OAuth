const bodyparser = require("body-parser");

const express = require("express");

const server = express();

const mongoose = require("mongoose");

server.use(bodyparser.json());

const PORT = 5000 || process.env.PORT

mongoose.Promise = global.Promise;
const uri = "mongodb://127.0.0.1:27017/users";


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



