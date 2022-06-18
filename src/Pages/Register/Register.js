import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import './Register.css'
import SocilLogin from '../Login/SocilLogin/SocilLogin';
import { Button, Form } from 'react-bootstrap';
import Loading from '../Shared/Loading/Loading';




const Register = () => {
    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification, sending, error1] = useSendEmailVerification(auth);
    const [updateProfile, updating, error2] = useUpdateProfile(auth);
    const navigate = useNavigate();
    if (user) {
        console.log('user', user);
    }
    if (loading || updating) {
        return <Loading></Loading>
    }

    const handelSubmitRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);
        // const agree = event.target.trems.checked;

        await createUserWithEmailAndPassword(email, password);
        await sendEmailVerification();
        alert('Sent email');
        await updateProfile({ displayName: name });
        console.log('Updated profile');
        navigate('/home')
    }
    return (
        <div className='w-50 mx-auto  mt-3 ' >
            <h1 className='text-center text-primary '>Please Register</h1>
            <Form onSubmit={handelSubmitRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">

                    <Form.Control type="text" name='name' placeholder="Enter your name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                    <Form.Check className={`${!agree ? '' : 'text-danger'}`} onClick={() => setAgree(!agree)} type="checkbox" name='trems' label="Accpet Genius Car Terms and Conditions" />
                </Form.Group>
                <Button onClick={() => createUserWithEmailAndPassword(auth)} className='w-50 d-block mx-auto' disabled={!agree} variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p>Already have an account? <span className='text-primary'><Link className='text-decoration-none' to="/login">Please Login</Link></span></p>
            <SocilLogin></SocilLogin>
        </div>
    );
};

export default Register;