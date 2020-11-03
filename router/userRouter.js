const router=require('express').Router()
const userController=require('../controller/userController')





router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/single-user/:id',userController.getSingleUser)
router.get('/users',userController.getAllUser)
router.post('/updateProfile',userController.updateProfile)
router.post('/googleLogin',userController.googleLogin)
router.post('/setpassword-google',userController.updateGoogleProfile)
router.post('/toggle',userController.toggleAccess)


// Store
router.post('/createStore',userController.createStore)
router.get('/deleteStore/:id',userController.deleteStore)
router.get('/getStores',userController.getStores)

router.post('/addLocation',userController.addLocation)
router.post('/getSingleLocation',userController.getSingleLocation)
router.post('/updateLocation',userController.updateLocation)

router.post('/createCategory',userController.createCategory)
router.get('/deleteCategory/:id',userController.deleteCategory)
router.get('/getCategory',userController.getCategory)




module.exports=router