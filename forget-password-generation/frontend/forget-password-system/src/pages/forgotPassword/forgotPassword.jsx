import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const forgotPasswordHandler = async () => {
        try {
            let res = await axios({
                url: 'http://localhost:5050/forget/password',
                method: 'POST',
                data: { email }
            })

            if (res.data.status === true) {
                setMessage('Check your email for reset link')
            } else {
                setMessage(res.data.message)
            }
        } catch (error) {
            console.log('error while sending reset link', error)
            setMessage('Something went wrong')
        }
    }

    return (
        <div>
            <h1>Forgot password</h1>

            <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br />

            <button onClick={forgotPasswordHandler}>Send Reset Link</button>

            {message && <p>{message}</p>}
        </div>
    )
}

export default ForgotPassword