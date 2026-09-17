import axios from 'axios'
import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get('token')
    console.log(token)

    const resetPasswordHandler = async () => {
        if (!token) {
            setMessage('Invalid or missing token')
            return
        }

        try {
            let res = await axios({
                url: 'http://localhost:5050/reset/password',
                method: 'POST',
                data: { token, password: password }
            })

            if (res.data.status === true) {
                setMessage('Password reset successfully! Redirecting to login...')
                setTimeout(() => navigate('/login'), 2000)
            } else {
                setMessage(res.data.message)
            }
        } catch (error) {
            console.log('error while resetting password', error)
            setMessage('Something went wrong')
        }
    }

    return (
        <div>
            <h1>Reset Password</h1>

            <input
                type='password'
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='new-password'
            /><br />

            <button onClick={resetPasswordHandler}>Reset Password</button>

            {message && <p>{message}</p>}
        </div>
    )
}

export default ResetPassword