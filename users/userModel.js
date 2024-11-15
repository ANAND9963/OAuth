const mongoose = require ("mongoose");

const userSchema =new mongoose.Schema({
    userName :{
        type:String,
        required : true,
        unique: true,
        

    },
    password : {
        type: String ,
        required : true,


    },
    slackId :{
        type : String,
        required: true,
        unique: true

    },
    createdAt :{
        type: Date,
        default : Date.now,

    }

})


module.exports = mongoose.model("users",userSchema);