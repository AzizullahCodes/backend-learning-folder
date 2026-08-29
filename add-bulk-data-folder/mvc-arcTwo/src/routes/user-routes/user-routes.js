// All user related routes are defined here...!

import express from "express";
import { addBulkProducts } from "../../controllers/user-controller/user-controller.js";

const router = express.Router();

router.route('/add-bulk-products').post(addBulkProducts)

export default router;