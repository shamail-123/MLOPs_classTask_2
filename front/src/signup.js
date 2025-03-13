import React, { useState } from 'react';

function Signup({ toggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            setMessage('✅ Signup successful! Please log in.');
        } else {
            setMessage('❌ Signup failed. Try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Sign Up</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={styles.input}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={styles.input}
            />
            <button onClick={handleSignup} style={styles.button}>Sign Up</button>
            <p style={styles.message}>{message}</p>
            <p style={styles.text}>Already have an account? <button onClick={toggle} style={styles.linkButton}>Login</button></p>
        </div>
    );
}

const styles = {
    container: {
        width: '300px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9'
    },
    heading: {
        color: '#333',
        marginBottom: '15px'
    },
    input: {
        width: '90%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    message: {
        color: '#d9534f',
        marginTop: '10px'
    },
    text: {
        fontSize: '14px'
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#007BFF',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '14px'
    }
};

export default Signup;
