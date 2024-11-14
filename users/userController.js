
const { hashPassword } = require("./middleware");
const userSchema = require("./userModel");

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

module.exports = createUser;