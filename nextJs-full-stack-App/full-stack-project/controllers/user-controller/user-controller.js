import bcrypt from 'bcryptjs'
import UserModal from '../../model/user-model/user-model.js'

const makeNewUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body || {}

    if (!email || !userName || !password || !role) {
      return res.status(400).send({ status: false, message: 'fill all fields' })
    }

    const isUserExisted = await UserModal.findOne({ email })
    if (isUserExisted) {
      return res
        .status(409)
        .send({ status: false, message: 'User with this email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const savedUser = await UserModal.create({
      userName,
      email,
      password: hashedPassword,
      role,
    })

    return res.status(201).send({
      status: true,
      message: 'User saved successfully',
      data: {
        _id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
        role: savedUser.role,
      }, // password response mein wapas mat bhejo
    })
  } catch (error) {
    console.error('Error while storing new user:', error)
    return res.status(500).send({
      status: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

export { makeNewUser }