import React, { useEffect, useState } from "react"
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from '../../firebase.init'
import { toast } from "react-toastify";


const SocialLogin = () => {
    const [authUser] = useAuthState(auth);
    const [signInWithGoogle, googleUser, loading, error] = useSignInWithGoogle(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/tasks";

    useEffect(() => {
        if (authUser) {
            navigate(from);
        }
    }, [authUser, from, navigate]);

    return (
            <div className="mt-6">
                <button onClick={() => signInWithGoogle()} className="w-full border-solid border-2 border-black bg-white text-black py-2 rounded  flex justify-center items-center">
                    <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
                    <span>Continue with Google</span>
                </button>
            </div>
    );
};

export default SocialLogin;