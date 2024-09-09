import React, { useState } from "react"
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <Helmet>
                <title>Login - Taskflow</title>
            </Helmet>

           <div className="max-w-screen-xl mx-auto">
           <nav className="bg-white  p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center cursor-pointer">
                        <img src="/logo555.png" alt="taskflow" width="30" height="30" />
                        <span className="text-lg  font-inter font-bold ml-2 mr-4">TaskFlow</span>
                    </div>
                </div>
        
            </nav>
            </div>

            <div className="min-w-screen flex items-center font-inter justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email" required
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'} required
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 mt-5 right-0 flex items-center px-3"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-500" />
                        </button>
                    </div>
                    <button
                        type="submit"

                        className="w-full bg-black border-solid border-2 border-black text-white font-medium text-md  rounded py-2"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6">
                    <button className="w-full border-solid border-2 border-black bg-white text-black py-2 rounded  flex justify-center items-center">
                    <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
                    <span>Continue with Google</span>
                    </button>
                </div>
                <div className="flex pt-5 justify-between text-sm">
                    <p>New to TaskFlow? <span><Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link></span></p>
                    <Link to="" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>


                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;