const bcrypt = require("bcrypt");

const user = require("./userModel");

const BCRYPT_COUNT = 11;

const jwt = require("jsonwebtoken")

const JWT_SECRET = "Pavan#9963"

const STATUS_USER_ERROR = 422;

const userError = (error, res) => {
  res.status(STATUS_USER_ERROR);

  if (error && error.message) {
    return res.json({ message: error.message });
  } else {
    return res.json({ message: res.message });
  }
};

const validateSigninName = (req, res, next) => {
  const { userName } = req.body;
  if (userName == null) {
    return userError(new Error("UserName is required"), res);
  }

  if (userName.length < 5) {
    return userError(
      new Error("UserName should contain at least 5 charachters"),
      res
    );
  }

  next();
};
const validatePassword = (req, res, next) => {
  const { password, confirmpassword, userName } = req.body;
  if (password == null) {
    return userError(new Error("password is required"), res);
  }
  if (password.includes(userName)) {
    return userError(new Error("password should not contain username"), res);
  }

  if (!confirmpassword && password !== confirmpassword) {
    return userError(
      new Error("password doesn't match please match the confirm password"),
      res
    );
  }

  next();
};
const hashPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, BCRYPT_COUNT, (err, hash) => {
    req.hashPassword = hash;
    next();
  });
};

const validateSignin = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const getUser = await user.findOne({ userName });

    if (getUser === null) {
      return userError(
        new Error("User doesn't exist with curent userName "),
        res
      );
    }

    bcrypt.compare(password, getUser.password, (error, response) => {
      if (!response && error == undefined) {
        return userError(
            new Error("Incorrect password"),
            res
          );
      } 
     
    });
    req.payload = {userName , slackId : getUser.slackId};
    
    next();

   
    
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }


};

const Authentication = (req, res , next) =>{
    const token = req.get("Authorization")
    jwt.verify(token, JWT_SECRET,(err,decoded)=>{
        if(err){
            return userError(
                new Error("Invalid Token"),
                res
              );

        }
        next();
        
    })

}

module.exports = {
  validateSigninName,
  validatePassword,
  hashPassword,
  validateSignin,
  userError,
  Authentication
};
