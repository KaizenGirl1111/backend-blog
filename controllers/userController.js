const Users = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUpAUser = async (req, res) => {
  let { username, email, password, phone } = req.body;
  console.log(req.body);
  const found = await Users.findOne({ username });
  console.log("found", found);
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (found !== null) {
      res.status(400).send({ message: "user already exists, try signing in." });
      return;
    }
    if ((password && email) || (password && phone)) {
      if (email) {
        console.log("found", found);
        if (found) {
          console.log("Username already exists");
          res.status(409).send("Username already exists");
        } else {
          const user = await Users.create({ ...req.body, password: hash });
          res.status(201).send({ username: user.username, email: user.email });
        }
        return;
      }
      if (phone) {
        console.log("found2", found);
        if (found) {
          console.log("User already exists");
          res.status(409).send("User already exists");
        } else {
          const user = await Users.create({ ...req.body, password: hash });
          res.status(201).send({ username: user.username, email: user.email });
        }
        return;
      }
    } else {
      res.status(400).send("email or phone and password is required");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
};

const signInAUser = async (req, res) => {
  const { email, password, phone } = req.body;
  let user;
  if (email) {
    user = await Users.findOne({ email: email });
  } else {
    user = await Users.findOne({ phone: phone });
  }
  //  console.log(user)
  if (!user) {
    //split the error in terms of email or phone not found
    return res
      .status(401)
      .send({
        message:
          "Email address or phone not present in database, try signing up",
      });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  //   console.log(password,user.password)
  const expIn = 6

  if (isMatch) {
    const token = jwt.sign({ _id: user._id }, process.env.secretKey
      // { expiresIn: expIn }
      );
    res.cookie("token",token,{
      httpOnly:true,
      secure:false, //https>>true
      sameSite:"lax", //lax or none for cross domain,strict for same domain
     maxAge:24*60*60*1000
     // maxAge:expIn*1000
    })
    return res.status(200).send({
      message: "User signed in successfully",
      user: { name: user.name, email: user.email },
      token,
    });
    
  }
  
  return res.send(403).send("Invalid password");
};

const myProfile = async (req, res) => {
  console.log(req.user, req.id);
  res.status(200).send({
    message: "me found",
    user: req.user,
    id: req.id,
  });
};

const deleteAUser = async (req, res) => {
  try {
    let deletedUser = await Users.findByIdAndDelete(req.user._id);
    res.status(410).send({
      message: "User is deleted",
      deletedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Error found",
      error: e,
    });
  }
};

const updateAUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      user: req.user._id,
      updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Error found",
      error: e,
    });
  }
};

const logout = (_,res)=>{
  try{
  res.clearCookie("token",{
    secure:false,
    httpOnly:true,
    sameSite:"lax"
  })
  res.status(200).send({"message":"User logged out successfully"})
}
catch(error){
  res.status(500).send({"message":"Error logging out",error})
}
}

const verifyCookie = (req,res)=>{
  res.send({
    authenticated:true,
    user:req.user,
    token:req.token
  })
}
module.exports = {
  signUpAUser,
  signInAUser,
  myProfile,
  deleteAUser,
  updateAUser,
  logout,
  verifyCookie
};
