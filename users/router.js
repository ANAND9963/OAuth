const { validate } = require("./userModel");

const {validateUserName, validatePassword ,hashPassword} = require ("./middleware")

const createUser = require("./userController")


const userRoutes =(server) => {

    server.get("/api/", (req,res)=>{
        res.send("connected to API");
    })
    server.post("/api/signup",validateUserName, validatePassword ,hashPassword,createUser);
}

module.exports = userRoutes;