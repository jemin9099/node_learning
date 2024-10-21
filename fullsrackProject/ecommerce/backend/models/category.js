const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    status:{type:Boolean,required:true},
    image:[{ type: String }],
},{
    timestamps:true
});

const categoryModel = mongoose.model("Category",categorySchema);
module.exports = categoryModel