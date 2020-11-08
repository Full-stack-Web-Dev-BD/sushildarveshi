const transectionRouter=require('express').Router()
const transectionController=require('../controller/transectionController')
const cart=require('../controller/Chart')



transectionRouter.post('/create',transectionController.createTransection)
transectionRouter.get('/getall',transectionController.getAll)
transectionRouter.post('/update',transectionController.update)
transectionRouter.post('/delete',transectionController.delete)
transectionRouter.get('/filter',transectionController.filterTransectionByMonth)



transectionRouter.get('/getchart',cart.getAllUser)



module.exports=transectionRouter