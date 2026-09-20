import express from 'express';
const router = express.Router();
// import { signUp, login, forgotPassword, resetPassword, sendOtp, verifyOtp } from '../../controllers/user-controller.js';
import { signUp,login, forgotPassword, resetPassword, sendOtp, verifyOtp } from '../../controllers/user-controller.js';
router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/forget/password').post(forgotPassword)
router.route('/reset/password').post(resetPassword)
router.post('/forgot/otp', sendOtp);
router.post('/verify/otp', verifyOtp);


export default router