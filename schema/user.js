const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')

//////////// schema for user table in DB ////////////////////
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,validate: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/},
    username:{type:String,required:true},
    password:{type:String,required:true} ,
    image:{ data: Buffer, contentType: String },
    gender:{type:String,required:true}
})
userSchema.methods.generateAuthToken = (id)=>{
    const token=jwt.sign({_id:id},process.env.SECRET_KEY)
    console.log(this._id)
    return token
}

 ///////match user schema with user table ///////
 const  User=mongoose.model('users',userSchema)

 module.exports=User;
