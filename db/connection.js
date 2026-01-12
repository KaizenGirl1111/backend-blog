const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
       await mongoose.connect('mongodb+srv://avnigungun:gungun@cluster0.xmy4ryl.mongodb.net/BE7_Db')
       console.log("DB is connected")
    }
    catch(e){
      throw new Error("Create connection")
    }
}

module.exports = connectDb