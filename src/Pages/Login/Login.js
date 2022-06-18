import React, { useRef } from 'react';
import { Button, Form, ToastContainer } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import Loading from '../Shared/Loading/Loading';
import SocilLogin from './SocilLogin/SocilLogin';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Login = () => {
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    let errorElement;
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    if (user) {
        navigate(from, { replace: true });
    }
    if (error || sending) {
        errorElement = <div>
            <p className='text-danger'>Error: {error?.message}</p>
        </div>
    }

    if (loading) {
        return <Loading></Loading>
    }
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Send password reset, please check your email')
        }
        else {
            toast('Please enter your email address!')
        }
    }
    const handelSubmitLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }
    return (
        <div className='w-50 mx-auto  mt-3 ' >
            <h1 className='text-center text-primary '>Please Login</h1>
            <Form onSubmit={handelSubmitLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
                {errorElement}
            </Form>

            <p>New to genius car? <span className='text-primary'><Link to="/register" className='text-decoration-none'>Please Register</Link></span></p>
            <p>Forget Pssword? <span className='text-primary'><button className='text-decoration-none btn btn-link' onClick={resetPassword}>Reset password</button></span></p>
            <SocilLogin></SocilLogin>
            <ToastContainer />
        </div>
    );
};

export default Login;