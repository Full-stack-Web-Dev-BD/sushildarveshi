const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ProductCatalogSchema=new Schema({
    catalog:[]
})



const ProductCatalogModel=mongoose.model('ProductCatalogModel',ProductCatalogSchema)
module.exports =ProductCatalogModel