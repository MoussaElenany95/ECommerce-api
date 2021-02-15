const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')

const adminSchema=new mongoose.Schema({
    email:{type:String,required:true,validate: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/},
    password:{type:String,required:true} 
   
})
adminSchema.methods.generateAuthToken = (id)=>{
    const token=jwt.sign({_id:id},process.env.SECRET_KEY)
    console.log(this._id)
    return token
}
 const  Admin=mongoose.model('admin',adminSchema)

 module.exports=Admin;