import React from 'react';
import google from '../../../images/socialicon/google.png';
import facebook from '../../../images/socialicon/facebook.png';
import github from '../../../images/socialicon/github.png';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocilLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const [signInWithFacebook, user2, loading2, error2] = useSignInWithFacebook(auth);
    const navigate = useNavigate();
    let errorElement;
    if (loading || loading1 || loading2) {
        return <Loading></Loading>
    }
    if (error || error1 || error2) {
        errorElement = <div>
            <p className='text-danger'>Error: {error?.message} {error1?.message} {error2?.message}</p>
        </div>
    }
    if (loading || loading1 || loading2) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    if (user || user1 || user2) {
        navigate('/home')
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '2px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '2px' }} className='bg-primary w-50'></div>
            </div>
            <div className=''>
                {errorElement};
                <button onClick={() => signInWithGoogle()} className='btn btn-info w-50 d-block mx-auto my-2'> <img style={{ width: '25px' }} src={google} alt="" /> Google Sign In</button>
                <button onClick={() => signInWithFacebook()} className='btn btn-primary w-50  d-block mx-auto my-2'> <img style={{ width: '25px' }} src={facebook} alt="" /> Facebook Sign In</button>
                <button onClick={() => signInWithGithub()} className='btn btn-warning w-50 d-block mx-auto '> <img style={{ width: '25px' }} src={github} alt="" /> Github Sign In</button>
            </div>
        </div>
    );
};

export default SocilLogin;