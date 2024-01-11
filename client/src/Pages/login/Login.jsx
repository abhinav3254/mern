import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
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
        alert(formData.username + " -: password :- " + formData.password)
        // Log the form data to the console
        console.log('Form Data:', formData);
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
                    <p className='goToSignUp'>Don't have an account? <span>signup</span> </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
