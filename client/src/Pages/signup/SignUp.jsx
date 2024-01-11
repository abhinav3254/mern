import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Signup.scss'

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        phone: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);
        alert(formData.name);
    };

    return (
        <div className='card'>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder='name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder='phone'
                    value={formData.phone}
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>

                <p className='goToLogIn'>Already have an account? <span><Link to='/'>login</Link></span> </p>
            </form>
        </div>
    );
}

export default SignUp;
