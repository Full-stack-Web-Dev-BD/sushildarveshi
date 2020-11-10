const productRouter=require('express').Router()
const { getAllProduct, getAllProductGroup ,getAllProductCatalog} =require('../controller/productController') 


productRouter.get('/getAllProduct',getAllProduct)
productRouter.get('/getAllProductGroup',getAllProductGroup)
productRouter.get('/getAllProductCatalog',getAllProductCatalog)


module.exports=productRouter