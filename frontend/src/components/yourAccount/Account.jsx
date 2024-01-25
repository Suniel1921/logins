import React, { useEffect, useState } from 'react';
import '../yourAccount/account.css';
import { FaUserCircle } from "react-icons/fa";
import Spinner from '../spinner/Spinner';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Account = () => {
  const navigate = useNavigate();
  const [roomsWithUser, setRoomWithUser] = useState([]);

  //getting all user  details with theier name and email
  const fetchUserRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`);
      console.log(response);
      if (response.data.success) {
        setRoomWithUser(response.data.roomsWithUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserRooms();
  }, []); // Fetch rooms when the component mounts

  // Extract user information (for showing user name and email only one time )
  const firstRoom = roomsWithUser[0];
  const user = firstRoom && firstRoom.authUser;



  // **********delete user room and update section*************
  const deleteHandler = async (roomId) => {
    const confirmed = window.confirm('Are you sure you want to delete this room?');  
    if (!confirmed) {
      return;
    }
  
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/deleteRoom/${roomId}`);
  
      if (response.data.success) {
        toast.success(response.data.message)
        fetchUserRooms();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  




  return (
    <>
      {user && (
        <div key={user._id} className='account'>
          <div className="accountDetails">
            <div className='userData'>
              {/* Display user information only once */}
              <h3>Welcome 🎉 {user.name}</h3>
              <h4>{user.email}</h4>
            </div>
            <div className='user'>
              <img className='userImg' src="/img/user.png" alt="user" />
            </div>
          </div>
        </div>
      )}

      <div className='userRoomsContainer'>
        {roomsWithUser.length > 0 ? (
          roomsWithUser.map(room => (
            <div key={room._id} className='userRoom'>
              {/* Display room information */}
              <div className='userRoomImg'><img src={room.imageUrl} alt="" /></div>
              <div className='userRoomData'>
                <p>Address: {room.address}</p>
                <p>Phone: {room.phone}</p>
                <p>Rent: {room.rent}</p>
                {/* <p>water: {room.water}</p> */}
                <p>Views: {room.viewCount}</p>
                <div className='icons'>
                <button onClick={() => deleteHandler(room._id)}>Delete</button>
                  <button>Edit</button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No rooms posted by the user.</p>
        )}
      </div>
    </>
  );
};

export default Account;
