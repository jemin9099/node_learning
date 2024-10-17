const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{type:String,required:true},
    description:{type:String,required:true},
    brandName:{type:String,required:true},
    price:{type:Number,required:true},
    image:[{ type: String }],
    category:{type:String,required:true},
    sellingPrice:{type:Number,required:true}
},{
    timestamps:true
});

const productModel = mongoose.model("Products",productSchema);
module.exports = productModel