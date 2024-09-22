import React from "react";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
const Nav = () => {

  const [authUser] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };

  return (

    <div>
      <nav className="bg-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <img src="/logo555.png" alt="taskflow" width="30" height="30" />
            <span className="text-lg font-bold ml-2 mr-4">TaskFlow</span>
          </div>

          {/* Buttons */}
          <div className="space-x-4">
            {authUser ? (<div className="flex justify-center items-center">
              <p className="text-md font-[500] px-2 py-1">Hi, {authUser.displayName}</p>
              <button onClick={logout} className="py-[5px] px-[18px] bg-black text-white font-medium text-md  rounded">
              Log Out
            </button>
            </div>)
              : (<>
                <Link to="/login">
                  <button className="text-md font-[500] px-2 py-1 hover:bg-gray-100 rounded transition duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="py-[5px] px-[18px] bg-black text-white font-medium text-md  rounded" href='/register'>
                    Register
                  </button>
                </Link>
              </>)}

          </div>
        </div>
      </nav>

    </div>
  );
}

export default Nav
