import express from 'express';
import { greetUser, fruitApi } from '../../controllers/user-controller/user-controller.js';

const router = express.Router();

router.route('/').get(greetUser);
router.route('/fruit').get(fruitApi);

export default router;