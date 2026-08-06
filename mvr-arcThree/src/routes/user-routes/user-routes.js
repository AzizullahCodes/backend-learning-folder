//user-routes.js
import express from 'express';
import { gretting ,makeNewUser} from "../../controllers/user-controller/usercontroller.js";

const myRoutes = express.Router();

myRoutes.route('/').get(gretting);
myRoutes.route('/newUser/saving').post(makeNewUser)

export default myRoutes