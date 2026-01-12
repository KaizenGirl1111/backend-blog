const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{type:String,trim:true,unique:true,sparse:true},
    username:{type:String,trim:true,required:true,unique:true},
    password:{type:String,password:true},
    phone:{type:Number,min:1000000000,max:9999999999,unique:true,sparse:true},
    role:{type:String,enum:['Admin','User','Guest'],default:'User',required:true}
})

userSchema.virtual("taskTable",{
  ref:"Task",
  localField:"_id",
  foreignField:"userId"
})

userSchema.virtual("blogTable",{
  ref:"Blog",
  localField:"_id",
  foreignField:"userId"
})
const Users = mongoose.model("User",userSchema)

module.exports = Users