import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        // Update the state with the entered values
        setFormData({
            // Spread the existing formData
            ...formData,
            // Update the specified field with the new value
            [event.target.name]: event.target.value
        });
    };

    const submitForm = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Log the form data to the console
        console.log('Form Data:', formData);


        // Using useNavigate to navigate to the '/home' route
        navigate('/home');

    };

    const forgetPassword = () => {
        alert('forget password?');
    }

    return (
        <div>
            <div className='card'>
                <form className='form' onSubmit={submitForm}>
                    <input
                        name='username'
                        placeholder='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        name='password'
                        placeholder='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <p className='forgetPassword' onClick={forgetPassword}>Forgot Password?</p>

                    <button type='submit'>Submit</button>
                    <p className='goToSignUp'>Don't have an account? <span><Link to='/signup'>Signup</Link></span></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
