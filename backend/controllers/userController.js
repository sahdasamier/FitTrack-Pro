const user =require('../models/userModel')


//login user
const loginUser =async(req,res)=>{
    res.json({mssg:'login user'})
}


//signup user
const signUpUser =async(req,res)=>{
    res.json({mssg:'signup user'})
}

module.exports={loginUser,signUpUser}