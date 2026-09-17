
import express from 'express';
import { signUp } from '../../controllers/user-controller.js';
const router = express.Router();
//signUp router 
router.route('/signup').post(signUp)

export default router