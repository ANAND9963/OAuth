const bcrypt = require ("bcrypt");

const BCRYPT_COUNT = 11;

const STATUS_USER_ERROR = 422;

const userError = (error,res) => {
    res.status(STATUS_USER_ERROR);

    if(error && error.message){
        res.json({message: error.message});
    }else{
        res.json({message:res.message});
    }
}



const validateUserName = (req, res, next)=>{
    const {userName} = req.body ;
    if(userName == null){
        return  userError(new Error("UserName is required"), res);
    }
    

    if(userName.length < 5){
        return  userError(new Error("UserName should contain at least 5 charachters"), res);
    }

    next();
    
}
const validatePassword = (req, res,next)=>{

    const {password , confirmpassword, userName} = req.body;
    if(password == null){
        return userError(new Error("password is required"), res);

    }
    if(password.includes(userName)){
        return userError(new Error("password should not contain username"), res);
    }

    if (!confirmpassword && password !== confirmpassword){

        return userError(new Error("password doesn't match please match the confirm password"), res);
    }



    next();


}
const hashPassword = (req, res , next)=>{

    const {password} = req.body;

    bcrypt.hash(password, BCRYPT_COUNT, (err, hash) =>{
        req.hashPassword = hash;
        next();
    })

}




module.exports = {validateUserName, validatePassword ,hashPassword}