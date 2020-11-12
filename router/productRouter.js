const productRouter=require('express').Router()
const { 
    getAllProduct, 
    getAllProductGroup ,
    getAllProductCatalog,
    updateProduct,
    deleteProduct,
    createProduct,
    deleteProductCatalog,
    createProductCatalog,
    createProductGroup,
    deleteProductGroup
} =require('../controller/productController') 






// Create
productRouter.post('/createProduct',createProduct)
productRouter.post('/createProductCatalog',createProductCatalog)
productRouter.post('/createProductGroup',createProductGroup)



// get 
productRouter.get('/getAllProduct',getAllProduct)
productRouter.get('/getAllProductGroup',getAllProductGroup)
productRouter.get('/getAllProductCatalog',getAllProductCatalog)
// update
productRouter.post('/updateProduct/:id',updateProduct)
// Delete
productRouter.delete('/deleteProduct/:id',deleteProduct)
productRouter.delete('/deleteProductCatalog/:id',deleteProductCatalog)
productRouter.delete('/deleteProductGroup/:id',deleteProductGroup)

module.exports=productRouter