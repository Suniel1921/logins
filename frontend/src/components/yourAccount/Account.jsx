import React from 'react';
import '../yourAccount/account.css';
import { FaUserCircle } from "react-icons/fa";
import { useAuthGloabally } from '../../context/AuthContext';
import Spinner from '../spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [auth, setAuth] = useAuthGloabally();
  const navigate = useNavigate();

  return (

    <>
   
    <div className='account'>
      <div className="accountDetails">
        <div className='userData'>
          {/* Check if auth.user exists before accessing its properties */}
          {auth.user ? (
            <>
              {/* <FaUserCircle size={70} /> */}
              <h3>Welcome 🎉 {auth.user.name}</h3>
              <h4>{auth.user.email}</h4>
            </>
          ) : (
            navigate('/')            
          )}
        </div>
        <div className='user'>
          <img className='userImg' src="/img/user.png" alt="user" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Account;
