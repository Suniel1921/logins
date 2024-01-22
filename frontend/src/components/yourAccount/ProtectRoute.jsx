import React, { useEffect, useState } from 'react';
import { useAuthGloabally } from '../../context/AuthContext';
import axios from 'axios';
import {Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../spinner/Spinner';

const ProtectRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuthGloabally();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/proctedRoute`);
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet/> : <Spinner /> 
    // return ok ? <Outlet/> : toast.error('Please Login first')
};

export default ProtectRoute;




// import React, { useEffect, useState } from 'react';
// import { useAuthGloabally } from '../../context/AuthContext';
// import axios from 'axios';
// import { Outlet } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Spinner from '../spinner/Spinner'; // Import your Spinner component

// const ProtectRoute = () => {
//     const [ok, setOk] = useState(false);
//     const [auth, setAuth] = useAuthGloabally();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const authCheck = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/proctedRoute`);
//                 if (response.data.ok) {
//                     setOk(true);
//                 } else {
//                     setOk(false);
//                     toast.error('Login first');
//                 }
//             } catch (error) {
//                 console.error('Error checking authentication:', error);
//                 setOk(false);
//                 toast.error('An error occurred. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (auth?.token) {
//             authCheck();
//         } else {
//             setOk(false);
//             setLoading(false);
//             toast.error('Login first');
//         }
//     }, [auth?.token]);

//     // Render loading state, Outlet, Spinner, or toast message based on the state
//     if (loading) {
//         return <Spinner />;
//     }

//     if (!ok) {
//         return null; // Render nothing or customize as needed
//     }

//     return <Outlet />;
// };

// export default ProtectRoute;

