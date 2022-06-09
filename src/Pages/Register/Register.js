import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {


    const handelSubmitRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);
    }
    return (
        <div className='register-form'>
            <h1>Please Register</h1>
            <form onSubmit={handelSubmitRegister}>
                <input type="text" name="name" placeholder='Enter your name' required id="" />
                <input type="email" name="email" placeholder='Enter your email' required id="" />
                <input type="password" name="password" placeholder='Enter your password' id="" />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <span className='text-primary'><Link to="/login">Please Login</Link></span></p>
        </div>
    );
};

export default Register;