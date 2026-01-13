const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
       await mongoose.connect(process.env.mongoURL)
       console.log("DB is connected")
    }
    catch(e){
      throw new Error("Create connection")
    }
}

module.exports = connectDb