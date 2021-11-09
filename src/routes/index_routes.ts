import  express from "express";
const router:express.Router=express.Router();
import { body } from 'express-validator'
import auth_middleware from '../../middlewares/auth-middleware'
const user_controller=require('../controller/user_controller')



router.get('/get',user_controller.get_users)

router.post('/post',[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').isLength({min:5}).withMessage('min 5 character required')
],user_controller.add_user)

router.put('/update/:id',auth_middleware,user_controller.update_user)

router.delete('/delete/:id',user_controller.delete_user)


module.exports=router
