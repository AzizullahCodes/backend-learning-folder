// src/components/Login.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5050/login', formData);

            //token aur user data localStorage mein save karein
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setMessage(response.data.message);

            setTimeout(() => {
                navigate('/dashboard');   // ya jo bhi aapka home/protected page ho
            }, 1000);

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
                <h2 style={styles.heading}>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {message && <p style={styles.message}>{message}</p>}

                <p style={styles.linkText}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                <p style={styles.linkText}>
                    Forgot password? <Link to="/forgot-password">Reset here</Link>
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
    },
    linkText: {
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '14px'
    }
};

export default Login;