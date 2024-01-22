// // import React, { useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import "../navbar/navbar.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../navbar/navbar.css";
import Search from "../search/Search";
import { Modal } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Login from "../auth/login/Login";
import Singup from "../auth/signup/Singup";
import { useAuthGloabally } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { CiSquarePlus } from "react-icons/ci";
import { useSearchGlobally } from "../../context/SearchContext";
import PostYourRoom from "../../pages/postRoom/PostYourRoom";

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


const Navbar = () => {
  // *******************modal style**********************
  const modalStyle = {
    top: 80,
    left: 463,
    transform: "none",
    width: '3%',
  };

  if (window.innerWidth <= 1178) {
    modalStyle.top = "80px";
    modalStyle.left = "350px";
    modalStyle.width = "20%";
  }
  if (window.innerWidth <= 915) {
    modalStyle.top = "80px";
    modalStyle.left = "250px";
    modalStyle.width = "50%";
  }
  if (window.innerWidth <= 750) {
    modalStyle.top = "80px";
    modalStyle.left = "220px";
    modalStyle.width = "20%";
  }
  if (window.innerWidth <= 580) {
    modalStyle.top = "80px";
    modalStyle.left = "120px";
    modalStyle.width = "20%";
  }
  if (window.innerWidth <= 370) {
    modalStyle.top = "80px";
    modalStyle.left = "10px";
    modalStyle.width = "100%";
  }

  // *******************modal style end here**********************

  const [auth, setAuth] = useAuthGloabally();
  const { searchQuery, setSearchQuery } = useSearchGlobally();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModelOpen, setIsSignupModelOpen] = useState(false);
  const [isPostYourRoomModalOpen, setIsPostYourRoomModalOpen] = useState(false);  

  //handle pop up box modal
  const openModal = () => {
    setIsModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignupModelOpen(false);
  };

  const openLoginModal = () => {
    setIsModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setIsModalOpen(false);
    setIsSignupModelOpen(true);
  };

  //post your room modal opening

  const openPostYourRoomModel = () => {
    setIsPostYourRoomModalOpen(true);
  }

  //handle logout
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully")
    // setIsModalOpen(false); //for show login singup modal pop up or not
  };

  return (
    <>
      <div className="navbarContainer">
        <nav className="navbar">
          <div className="logo">
            <NavLink to={"/"}>
              <h4>logo</h4>
            </NavLink>
          </div>
          <div className="searchBar">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="postYourRoom" onClick={openPostYourRoomModel}>
            <NavLink > <div className="plusicon"><CiSquarePlus size={20} />Post Your Room</div></NavLink>
            {/* <NavLink to={'/account/postYourRoom'}> <div className="plusicon"><CiSquarePlus size={20}/> Post Your Room</div></NavLink> */}
          </div>
          <div className="userIcon">
            <i onClick={openModal}>
              <div className="allIcons">
                <IoMenu size={20} />
                {
                  auth.user ? (
                    <div className="user_initial">{auth.user.name.charAt(0).toUpperCase()}</div>
                  ) : (<FaUserCircle size={32} color={"#717171"} />)
                }
              </div>
            </i>
          </div>
        </nav>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          style={modalStyle}
          width={"20%"}
          mask={false}
          className="modalCustomWidth"
          >
          <div className="popUp_login_singup">
            {auth.user ? (
              <>
                <h2 style={{textAlign: 'center'}}>Hi ! {auth.user.name}</h2> <hr /> <br />
                <NavLink to={'/account'}  onClick={() => setIsModalOpen(false)}><p>Your Account</p></NavLink>
                <p>Help Center</p>
                <p>Contact</p>
                <p onClick={handleLogout}>Logout</p>
              </>
            ) : (
              <>
                <p onClick={openLoginModal}>Login</p>
                <p onClick={openSignupModal}>Sign up</p>
              </>
            )}
          </div>
        </Modal>

        


      </div>
      <Modal
        open={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
        footer={null}
      >
        <Login />
      </Modal>
      <Modal
        open={isSignupModelOpen}
        onCancel={() => setIsSignupModelOpen(false)}
        footer={null}
      >
        <Singup />
      </Modal>
      <hr />

      {/* modal for post your room  */}
      <Modal open={isPostYourRoomModalOpen} onCancel={() => setIsPostYourRoomModalOpen(false)} footer={null}>
        <h3 style={{ textAlign: 'center' }}>Post Your Room From Here</h3>
        <PostYourRoom />
      </Modal>


    </>
  );
};

export default Navbar;
