// src/components/ForgotPassword.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5050/forgot-password', {
                email
            });
            setMessage(response.data.message);
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
                <h2 style={styles.heading}>Forgot Password</h2>
                <p style={styles.subText}>
                    Apna registered email daalein, hum aapko reset link bhej denge.
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                {message && <p style={styles.message}>{message}</p>}

                <p style={styles.linkText}>
                    Remember your password? <Link to="/login">Login</Link>
                </p>
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
        marginBottom: '10px',
        textAlign: 'center'
    },
    subText: {
        fontSize: '13px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '15px'
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
    },
    linkText: {
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '14px'
    }
};

export default ForgotPassword;