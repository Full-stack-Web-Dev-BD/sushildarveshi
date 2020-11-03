const mongoose=require('mongoose')
const Schema=mongoose.Schema

const TransectionSchema=new Schema({
    date:Date,
    price:Number,
    customerName:String,
    productName:String,
    store:String,
    category:String,
    description:String,
})



const Transection=mongoose.model('Transection',TransectionSchema)
module.exports =Transection