// All user related routes are defined here...!

import express from "express";
import { greetUser, createUser,fetchUsers,deleteUser } from "../../controllers/user-controller/user-controller.js";

const router = express.Router();

router.route('/').get(greetUser);

router.route('/user/save').post(createUser);
router.route('/user/fetchUser').get(fetchUsers)
router.route('/user/deleteUser').delete(deleteUser)

export default router;