// All user related routes are defined here...!

import express from "express";
import { addBulkProducts, fetchUsers } from "../../controllers/user-controller/user-controller.js";

const router = express.Router();

router.route('/add-bulk-products').post(addBulkProducts);
router.route('/users/fetch').get(fetchUsers)

export default router;