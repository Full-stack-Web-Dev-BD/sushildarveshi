const mongoose=require('mongoose')
const Schema=mongoose.Schema

const storeSchema=new Schema({
    name:String
})



const Store=mongoose.model('Store',storeSchema)
module.exports =Store