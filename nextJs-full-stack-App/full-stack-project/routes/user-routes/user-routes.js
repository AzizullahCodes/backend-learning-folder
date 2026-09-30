import express from 'express'
import { makeNewUser,fetchAllUsers } from '../../controllers/user-controller/user-controller.js'

const router = express.Router()

router.route('/create/newUser').post(makeNewUser)
router.route('/fetch/allusers').get(fetchAllUsers)

export default router