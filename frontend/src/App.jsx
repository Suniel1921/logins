
import React from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from './components/yourAccount/Account';
import ProtectRoute from './components/yourAccount/ProtectRoute';
import PostYourRoom from './pages/postRoom/PostYourRoom';
import RoomDetails from './pages/roomDetails/RoomDetails';
import Navbar from './components/navbar/Navbar';
import Features from './pages/roomDetails/Features';
import Location from './pages/roomDetails/Location';
import OTPModal from './pages/OTPmodal/OTPModel';
import NotFound from './pages/notfound/NotFound';
import UserRoom from './components/yourAccount/userRoom/UserRoom';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import Users from './components/admin/users/Users';



const App = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
              <Route path='/roomDetails/:id' element={<RoomDetails />} />
              <Route path='/roomDetails/features' element={<Features/>}/>
              <Route path='/roomDetails/location' element={<Location/>}/>
              <Route path='/verifyOTP' element={<OTPModal/>}/>
              <Route path='*' element={<NotFound/>}/>

            {/*protected routes */}
            <Route path='/account' element={<ProtectRoute />}>
              <Route path='/account/postYourRoom' element={<PostYourRoom />} />
              <Route index element={<Account />} />
              <Route path='/account/UserRoom' element={<UserRoom/>}/>
              <Route path='/account/admin' element={<AdminDashboard/>}/>
              <Route path='/account/admin/users' element={<Users/>}/>

              {/* Normal route */}

            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
