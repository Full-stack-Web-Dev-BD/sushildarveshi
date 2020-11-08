const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ProductSchema=new Schema({
    productCode:String,	
    description:{
        type:String,
        default:""
    },
    productGroupCode:String,	
    MOQ:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        default:""
    },
    catalogCode:String
})



const Product=mongoose.model('Product',ProductSchema)
module.exports =Product