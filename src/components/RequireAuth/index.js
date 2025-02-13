import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
    const [authUser, loading] = useAuthState(auth);
    const location = useLocation();

    if(loading){
        return;
    }

    if(!authUser){
        return <Navigate to="/login" state={{ from: location.pathname }} replace/>;
    }
    return children;
};

export default RequireAuth;