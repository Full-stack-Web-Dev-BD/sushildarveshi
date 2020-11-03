const mongoose=require('mongoose')
const Schema=mongoose.Schema

const locationSchema=new Schema({
    uid:Schema.Types.ObjectId,
    street:String,
    number: String,
    neighborhood: String,
    country: String,
})



const LocationModel=mongoose.model('LocationModel',locationSchema)
module.exports =LocationModel