import express from 'express';
import { signUp,login,forgotPassword ,resetPassword } from '../../controllers/user-controller.js';
const router = express.Router();

router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/forget/password').post(forgotPassword)
router.route('/reset/password').post(resetPassword)


export default router