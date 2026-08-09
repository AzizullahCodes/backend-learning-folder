// All user related routes are defined here...!

import express from "express";
import { greetUser, createUser,fetchUsers,deleteUser,updateUser } from "../../controllers/user-controller/user-controller.js";

const router = express.Router();

router.route('/').get(greetUser);

router.route('/user/save').post(createUser);
router.route('/user/fetchUser').get(fetchUsers)
router.route('/user/deleteUser/:uid').delete(deleteUser)
router.route('/user/updateUser/:uid').put(updateUser)

export default router;