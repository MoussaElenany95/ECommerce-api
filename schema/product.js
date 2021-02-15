const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    image:{data: Buffer, contentType: String },
    price:{type:Number,required:true} ,
    details:{ type:String,required:true 
    }
})

 const  Product=mongoose.model('product',productSchema)

 module.exports=Product;
