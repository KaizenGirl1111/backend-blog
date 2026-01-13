const User = require('../model/userModel')
const jwt = require("jsonwebtoken")
// const auth = async(req,res,next)=>{
//     // const authHeader = req.header('Authorization')
//     // const token = authHeader.replace("Bearer ","")
//     // const verify = jwt.verify(token,secretKey)
//     // next()
//     try{
//       const authHeader = req.header('Authorization')
//       if(!authHeader){
//         res.status(400).send({"message":"Authorisation header is missing"})
//       }
//       const parts = authHeader.split(" ")
//       console.log(parts.length)
//       if(parts.length!==2||parts[0]!=="Bearer"){
//         return res.status(401).send({"message":"Invalid Authorization format"})
//       }
//       const token = authHeader.replace("Bearer ","")
//       const verify = jwt.verify(token, secretKey)
//       if(!verify){
//         res.status(403).send({"message":"Verification failed"})
//       }
//       const user = await User.findById(verify._id)
//       const cookies = user.cookies
//       if(!user){
//         res.status(404).send({"message":"No existing user with current credentials"})
//       }
//       req.user=user 
//       req.token=token
//       next()
//    }
//     catch(e){
//      res.status(500).send({"message":"Authentication is failed"})
//     }
// }


const auth = async(req,res,next)=>{
    try{
      const token = req.cookies.token
      const verify = jwt.verify(token, process.env.secretKey)
      if(!verify){
        res.status(403).send({"message":"Verification failed"})
      }
      const user = await User.findById(verify._id)
      if(!user){
        res.status(404).send({"message":"No existing user with current credentials"})
      }
      req.user=user 
      req.token=token
      req.id = verify._id
      next()
  }
   catch(e){
    res.status(500).send({"message":"Authentication is failed"})
   }
}

module.exports = auth