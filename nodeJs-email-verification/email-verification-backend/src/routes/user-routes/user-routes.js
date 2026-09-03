//user-routes 
import express from 'express';
import { signUp,handleLogIn,userVerification } from '../../controllers/user-controller/user-controller.js';
const router = express.Router();
router.route('/signup').post(signUp);
router.route('/login').post(handleLogIn)
router.route('/emailVerifcation').post(userVerification)
export default router;