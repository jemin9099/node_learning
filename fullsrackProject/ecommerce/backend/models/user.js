const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    image:String
},{
    timestamps:true
});

const userModel = mongoose.model("User",userSchema);
module.exports = userModel