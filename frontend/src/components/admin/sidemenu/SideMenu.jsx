import React from "react";
import "../sidemenu/sidemenu.css";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
const SideMenu = () => {
  return (
    <>
      <div className="sideMenu">
        <div className="sideItems">
          <Link to={"/account/admin"} className="listItems">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to={"/account/admin/users"} className="listItems">
            <FaUserPlus />
            <span>Users</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
