const mongoose = require("mongoose")



const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone:String,
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        }
    }
)

var userModel=mongoose.model("users",userSchema)
module.exports=userModel