import React, { useEffect, useState } from "react";
import "../yourAccount/account.css";
import Menu from "./sideMenu/Menu";
import Chart from "./chart/Chart";
import { BarChart } from "recharts";
import LineBarChart from "./chart/LineBarChart";
import AreaChartBox from "./chart/AreaChartBox";
import CirlcePiChart from "./chart/CirlcePiChart";
import { useAuthGloabally } from "../../context/AuthContext";
import axios from "axios";
import Loading from "../auth/signup/Loading";

const Account = () => {
  const [auth, setAuth] = useAuthGloabally();
  const [roomsWithUser, setRoomWithUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  // Fetch user rooms
  const fetchUserRooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`
      );
      if (response.data.success) {
        setRoomWithUser(response.data.roomsWithUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Update loading state when data fetching is completed
    }
  };

  useEffect(() => {
    fetchUserRooms();
  }, []);

  return (
    <>
      {isLoading ? ( // Show spinner if data is loading
        <>
          <Loading />
          {/* <div className="menu"><Menu /></div> */}
        </>
      ) : roomsWithUser.length > 0 ? (
        <div className="accountContainer">
          <div className="menu"><Menu /></div>
          <div className="rightSectionMenuData">
            <div className="grid_account">
              <div className="box box1">
                {/* <h3>Welcome 🎉{auth.user?.name} </h3> */}
                {auth.user && <h3>Welcome 🎉{auth.user.name} </h3>}
                <h5 style={{ textAlign: "center", margin: "20 20" }}>
                  Disclaimer !
                </h5>
                <p>
                  "HamroRooms takes user privacy and data security seriously.
                  While every effort is made to protect user data, including phone
                  numbers and addresses, from unauthorized access or disclosure,
                  users are advised to exercise caution when sharing personal
                  information. HamroRooms cannot guarantee absolute security and
                  is not liable for any data leaks or breaches resulting from user
                  actions or external factors beyond our control."
                </p>
              </div>
              <div className="box box2"><Chart /></div>
              <div className="box box3"><Chart /></div>
              <div className="box box4"><CirlcePiChart /></div>
              <div className="box box5"><Chart /></div>
              <div className="box box6"><Chart /></div>
              <div className="box box7"><AreaChartBox /></div>
              <div className="box box8"><LineBarChart /></div>
              <div className="box box9"><LineBarChart /></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="account">
          <div className="accountDetails">
            <div className="userData">
              <h3>Welcome 🎉 {auth.user.name}</h3>
              <h4>{auth.user.email}</h4>
            </div>
            <div className="user">
              <img className="userImg" src="/img/user.png" alt="user" />
            </div>
          </div>
        </div>
      )}
    </>

  );
};

export default Account;
