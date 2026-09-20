import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VerifyOtp = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const sendOtpHandler = async () => {
        try {
            const res = await axios.post('http://localhost:5050/forgot/otp', { email })
            setMessage(res.data.message)
            if (res.data.status) setOtpSent(true)
        } catch (error) {
            console.log('error while sending otp', error)
            setMessage('Something went wrong')
        }
    }

    const verifyOtpHandler = async () => {
        try {
            const res = await axios.post('http://localhost:5050/verify/otp', { email, otp })
            if (res.data.status) {
                // navigate(`/reset-password?token=${res.data.token}`)
                navigate(`/resetPassword?token=${res.data.token}`)
            } else {
                setMessage(res.data.message)
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div>
            <h1>Forgot Password</h1>

            <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
            /><br />

            {!otpSent ? (
                <button onClick={sendOtpHandler}>Send OTP</button>
            ) : (
                <>
                    <input
                        type='text'
                        placeholder='Enter 6 digit OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                    /><br />
                    <button onClick={verifyOtpHandler}>Verify OTP</button>
                    <button onClick={sendOtpHandler}>Resend OTP</button>
                </>
            )}

            {message && <p>{message}</p>}
        </div>
    )
}

export default VerifyOtp