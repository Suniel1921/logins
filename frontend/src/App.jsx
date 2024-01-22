// import React from 'react'
// import Layout from './components/layout/Layout'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/home/Home';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Account from './components/yourAccount/Account';
// import ProtectRoute from './components/yourAccount/ProtectRoute';




// const App = () => {
//   return (
//     <>
//     <Router>
//       <Routes>
//         <Route path='/' element={<Layout/>}>
//           <Route path='' element={<Home/>}/>         

//           <Route path='/account' element={<ProtectRoute/>}>
//             <Route path='' element={<Account/>}/>
//           </Route> 

//         </Route>
//       </Routes>
//       <ToastContainer />
//     </Router>


//     </>
//   )
// }

// export default App




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

            {/*protected routes */}
            <Route path='/account' element={<ProtectRoute />}>
              <Route index element={<Account />} />
              <Route path='/account/postYourRoom' element={<PostYourRoom />} />

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
