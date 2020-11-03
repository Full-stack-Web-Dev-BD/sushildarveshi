const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:String,
    email:String,
    password:String,
    type:String,
    pp:String,
    aboutMe:String,
    google:Boolean,
    facebook:Boolean,
    access:Boolean
})



const userModel=mongoose.model('userModel',userSchema)
module.exports =userModel