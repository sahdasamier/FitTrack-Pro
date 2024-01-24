const mongoose = require ('mongoose')

const Schema = mongoose.Schema


const userModel =new Schema({
    email:{
        type:String,
        required:true,
        unique:true,    
    },
    password:{
     type:string,
     required:true,
     unique:true, 
    }
})

module.exports=mongoose.model('user',userSchema)