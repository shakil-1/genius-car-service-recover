import React from 'react';
import { useAuthState, useSendEmailVerification, } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../Firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    if (!user.emailVerified) {
        return <div className='text-center'>
            <h1 className='text-danger'>Your Email is not Verified!!</h1>
            <h5 className='text-success'>Please Verify your email address</h5>
            <button
                className='btn btn-primary'
                onClick={async () => {
                    await sendEmailVerification();
                    toast('Sent email');
                }}>
                Send Verification email Again
            </button>
            <ToastContainer />
        </div>
    }
    return children;
};

export default RequireAuth;