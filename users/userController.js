
const { hashPassword } = require("./middleware");
const userSchema = require("./userModel");
const {userError} = require("./middleware")

const jwt = require("jsonwebtoken")

const JWT_SECRET = "Pavan#9963"

const createUser = async(req, res) =>{

   let playload = {
    userName : req.body.userName,
    password : req.hashPassword,
    slackId : req.body.slackId
   }
    try
    {
        const newuser = await userSchema.create(playload);
        res.status(200).json(newuser);

    }catch(error){
        res.status(422).json("user already exist");
        console.log("error" , error);
        

    }


}

const loginUser = async(req,res)=>{
    const {payload} = req;
    try{
    
    const token = await jwt.sign(payload , JWT_SECRET);
    res.status(200).json({token});

    }catch(err){
        res.status(400).send("Invalid Login");
    }
}

module.exports = {createUser,loginUser};