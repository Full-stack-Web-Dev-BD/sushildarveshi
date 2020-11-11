const productRouter=require('express').Router()
const { getAllProduct, getAllProductGroup ,getAllProductCatalog, updateProduct, deleteProduct} =require('../controller/productController') 

// get 
productRouter.get('/getAllProduct',getAllProduct)
productRouter.get('/getAllProductGroup',getAllProductGroup)
productRouter.get('/getAllProductCatalog',getAllProductCatalog)
// update
productRouter.post('/updateProduct/:id',updateProduct)
// Delete
productRouter.delete('/deleteProduct/:id',deleteProduct)

module.exports=productRouter