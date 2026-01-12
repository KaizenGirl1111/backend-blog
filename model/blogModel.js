const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title:{type:String,required:true,trim:true},
    userId:{type:mongoose.Schema.ObjectId,ref:"User",required:true},
    author:{type:String,required:true},
   category:{type:String,enum:["Poetry","Article","Story","Other"],default:"Other",required:true},
   status:{type:String,enum:["Pending","In Progress","Completed"],default:"Pending",required:true},
    content:{type:String,required:true},
},
{timestamps:true}
)

const Blog = mongoose.model("Blog",BlogSchema)

module.exports = Blog