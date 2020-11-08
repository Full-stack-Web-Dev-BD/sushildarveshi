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


module.exports=router