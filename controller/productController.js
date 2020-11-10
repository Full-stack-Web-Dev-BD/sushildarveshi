const Product = require("../model/Product");
const ProductCatalogModel = require("../model/ProductCatalogModel");
const ProductGroupModel = require("../model/ProductGroupModel");

module.exports={
    getAllProduct(req,res){
        Product.find()
        .then(doc=>{
            return res.json(doc)
        })
        .catch(err=>{
            console.log(err);
        })
    },
    getAllProductGroup(req,res){
        ProductGroupModel.findOne()
        .then(productGroup=>{
            return res.json(productGroup)
        })
        .catch(err=>console.log(err))
    },
    getAllProductCatalog(req,res){
        ProductCatalogModel.findOne()
        .then(productCatalog=>{
            return res.json(productCatalog)
        })
        .catch(err=>console.log(err))
    },
}