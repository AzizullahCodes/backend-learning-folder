import express from 'express'
import { makeNewUser } from '../../controllers/user-controller/user-controller.js'

const router = express.Router()

router.route('/create/newUser').post(makeNewUser)

export default router