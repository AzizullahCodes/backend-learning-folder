//user-routes 
import express from 'express';
import { signUp,handleLogIn,handleEmailVerification}from '../../controllers/user-controller/user-controller.js';
const router = express.Router();
router.route('/signup').post(signUp);
router.route('/login').post(handleLogIn)
router.route('/emailVerifcation').post(handleEmailVerification)
export default router;