import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let result = await fetch("http://localhost:5000/login", {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")
        } else {
            alert("Please enter connect details")
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='container'>
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleLogin}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    className='inputbox'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                />

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    className='inputbox'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                />

                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    );
}

export default Login;
