const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ProductGroupSchema=new Schema({
    productGroup:[]
})



const ProductGroupModel=mongoose.model('ProductGroupModel',ProductGroupSchema)
module.exports =ProductGroupModel