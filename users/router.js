const { validate } = require("./userModel");

const {validateSigninName, validatePassword ,hashPassword, validateSignin, Authentication } = require ("./middleware")

const {createUser, loginUser} = require("./userController")


const userRoutes =(server) => {

    server.get("/api/verify", Authentication,  (req, res)=>{

        res.status(200).send("You have access");
    });
    server.post("/api/signup",validateSigninName, validatePassword ,hashPassword,createUser);
    server.post("/api/signin" , validateSignin,loginUser)
}

module.exports = userRoutes;