// src/components/ResetPassword.jsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (newPassword !== confirmPassword) {
            setMessage('passwords match nahi ho rahe');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:5050/reset-password/${token}`,
                { newPassword }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setMessage(
                error?.response?.data?.message || 'something went wrong, try again'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Reset Password</h2>

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>

                {message && <p style={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f5f5f5'
    },
    form: {
        background: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '350px'
    },
    heading: {
        marginBottom: '15px',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%',
        padding: '10px',
        background: '#4f46e5',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '15px'
    },
    message: {
        marginTop: '10px',
        color: '#333',
        textAlign: 'center'
    }
};

export default ResetPassword;