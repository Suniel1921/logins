// import React, { useEffect, useState } from 'react';
// import '../yourAccount/account.css';
// import { FaUserCircle } from "react-icons/fa";
// import Spinner from '../spinner/Spinner';
// import { redirect, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Modal, Select } from 'antd'
// import { MdDeleteForever } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";


// const Account = () => {
//   const navigate = useNavigate();
//   const [roomsWithUser, setRoomWithUser] = useState([]);
//   const [isEditModelOpen, setIsEditModelOpen] = useState(false)
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [updatedRoomData, setUpdatedRoomData] = useState({
//     address: '',
//     rent: '',
//     phone: '',
//     parking: '',
//     water: '',
//     floor: '',
//   });

//   //getting all user  details with theier name and email
//   const fetchUserRooms = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`);
//       console.log(response);
//       if (response.data.success) {
//         setRoomWithUser(response.data.roomsWithUser);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUserRooms();
//   }, []); // Fetch rooms when the component mounts

//   // Extract user information (for showing user name and email only one time )
//   const firstRoom = roomsWithUser[0];
//   const user = firstRoom && firstRoom.authUser;



//   // **********delete user room and update section*************
//   const deleteHandler = async (roomId) => {
//     const confirmed = window.confirm('Are you sure you want to delete this room?');
//     if (!confirmed) {
//       return;
//     }

//     try {
//       const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/deleteRoom/${roomId}`);

//       if (response.data.success) {
//         toast.success(response.data.message)
//         fetchUserRooms();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//   };


//   //edit model open close
//   const showModal = (roomId) => {
//     const selectedRoom = roomsWithUser.find((room) => room._id === roomId);
//     setSelectedRoomId(roomId);
//     setUpdatedRoomData({
//       address: selectedRoom.address,
//       rent: selectedRoom.rent,
//       phone: selectedRoom.phone,
//       parking: selectedRoom.parking,
//       water: selectedRoom.water,
//       floor: selectedRoom.floor,
//     });
//     setIsEditModelOpen(true);
//   };

//   // ***********update handler****************
//   const updateHandler = async () => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/updateRoom/${selectedRoomId}`,
//         updatedRoomData
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setIsEditModelOpen(false);
//         fetchUserRooms();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//   };




//   return (
//     <>
//       {user && (
//         <div key={user._id} className='account'>
//           <div className="accountDetails">
//             <div className='userData'>
//               {/* Display user information only once */}
//               <h3>Welcome 🎉 {user.name}</h3>
//               <h4>{user.email}</h4>
//             </div>
//             <div className='user'>
//               <img className='userImg' src="/img/user.png" alt="user" />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className='userRoomsContainer'>
//         {roomsWithUser.length > 0 ? (
//           roomsWithUser.map(room => (
//             <div key={room._id} className='userRoom'>
//               {/* Display room information */}
//               <div className='userRoomImg'><img src={room.imageUrl} alt="" /></div>
//               <div className='userRoomData'>
//                 <p>Address: {room.address}</p>
//                 <p>Phone: {room.phone}</p>
//                 <p>Rent: {room.rent}</p>
//                 {/* <p>water: {room.water}</p> */}
//                 <p>Views: {room.viewCount}</p>
//                 <div className='icons'>
//                   <span className='deleteIcon' onClick={() => deleteHandler(room._id)}><MdDeleteForever/></span>
//                   <span className='editIcon' onClick={() => showModal(room._id)}><FaEdit/></span>
//                 </div>

//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No rooms posted by the user.</p>
//         )}
//       </div>

//       {/* update modal  */}
//       <Modal open={isEditModelOpen} onCancel={() => setIsEditModelOpen(false)} onOk={updateHandler} footer={null}>
//         <form className='editRoomForm'>
//           <h3>Edit Your Room Details</h3>
//           <div className='formRow'>
//             <div className='formColumn'>
//               <label htmlFor='address'>Address:</label>
//               <input
//                 type='text'
//                 id='address'
//                 value={updatedRoomData.address}
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, address: e.target.value })}
//               />
//             </div>

//             <div className='formColumn'>
//               <label htmlFor='rent'>Rent:</label>
//               <input
//                 type='number'
//                 id='rent'
//                 value={updatedRoomData.rent}
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, rent: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className='formRow'>
//             <div className='formColumn'>
//               <label htmlFor='phone'>Phone:</label>
//               <input
//                 type='text'
//                 id='phone'
//                 value={updatedRoomData.phone}
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, phone: e.target.value })}
//               />
//             </div>

//             <div className='formColum'>
//               <label htmlFor='phone'>Parking</label>
//               <select className='selectOption'
//                 id="parking"
//                 name="parking"
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, parking: e.target.value })}
//                 value={updatedRoomData.parking}
//               >
//                 <option value="" label="Parking Availability" />
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </div>
//             <div className='formColum'>
//               <label htmlFor='water'>Water</label>
//               <select className='selectOption'
//                 id="water"
//                 name="water"
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, water: e.target.value })}
//                 value={updatedRoomData.water}
//               >
//                 <option value="" label="water" />
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </div>
//             <div className='formColum'>
//               <label htmlFor='floor'>Floor</label>
//               <select className='selectOption'
//                 id="floor"
//                 name="floor"
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, floor: e.target.value })}
//                 value={updatedRoomData.floor}
//               >
//                 <option value="" label="Floor " />
//                 <option value="1st" label="1st" />
//                 <option value="2nd" label="2nd" />
//                 <option value="3rd" label="3rd" />
//                 <option value="4th" label="4th" />
//                 <option value="5th" label="5th" />
//               </select>
//             </div>


//             {/* Add other input fields for updating other room details */}
//           </div>

//           <button type='button' onClick={updateHandler} className='updateBtn'>
//             Update
//           </button>
//         </form>
//       </Modal>



//     </>
//   );
// };

// export default Account;
















// ********latest code ********

// import React, { useEffect, useState } from 'react';
// import '../yourAccount/account.css';
// import { FaUserCircle } from "react-icons/fa";
// import Spinner from '../spinner/Spinner';
// import { redirect, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Modal, Select } from 'antd'
// import { MdDeleteForever } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";


// const Account = () => {
//   const navigate = useNavigate();
//   const [roomsWithUser, setRoomWithUser] = useState([]);
//   const [isEditModelOpen, setIsEditModelOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [updatedRoomData, setUpdatedRoomData] = useState({
//     address: '',
//     rent: '',
//     phone: '',
//     parking: '',
//     water: '',
//     floor: '',
//   });

//   const fetchUserRooms = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/roomCount`);
//       console.log(response);
//       if (response.data.success) {
//         setRoomWithUser(response.data.roomsWithUser);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUserRooms();
//   }, []);


//   const firstRoom = roomsWithUser[0];
//   const user = firstRoom && firstRoom.authUser;

//   const deleteHandler = async (roomId) => {
//     setSelectedRoomId(roomId);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeleteHandler = async () => {
//     try {
//       const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/deleteRoom/${selectedRoomId}`);

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setIsDeleteModalOpen(false);
//         fetchUserRooms();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//   };

//   const showModal = (roomId) => {
//     const selectedRoom = roomsWithUser.find((room) => room._id === roomId);
//     setSelectedRoomId(roomId);
//     setUpdatedRoomData({
//       address: selectedRoom.address,
//       rent: selectedRoom.rent,
//       phone: selectedRoom.phone,
//       parking: selectedRoom.parking,
//       water: selectedRoom.water,
//       floor: selectedRoom.floor,
//     });
//     setIsEditModelOpen(true);
//   };

//   const updateHandler = async () => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/updateRoom/${selectedRoomId}`,
//         updatedRoomData
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setIsEditModelOpen(false);
//         fetchUserRooms();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <>
//       {user && (
//         <div key={user._id} className='account'>
//           <div className="accountDetails">
//             <div className='userData'>
//               <h3>Welcome 🎉 {user.name}</h3>
//               <h4>{user.email}</h4>
//             </div>
//             <div className='user'>
//               <img className='userImg' src="/img/user.png" alt="user" />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className='userRoomsContainer'>
//         {roomsWithUser.length > 0 ? (
//           roomsWithUser.map(room => (
//             <div key={room._id} className='userRoom'>
//               <div className='userRoomImg'><img src={room.imageUrl} alt="" /></div>
//               <div className='userRoomData'>
//                 <p>Address: {room.address}</p>
//                 <p>Phone: {room.phone}</p>
//                 <p>Rent: {room.rent}</p>
//                 <p>Views: {room.viewCount}</p>
//                 <div className='icons'>
//                   <span className='deleteIcon' onClick={() => deleteHandler(room._id)}><MdDeleteForever /></span>
//                   <span className='editIcon' onClick={() => showModal(room._id)}><FaEdit /></span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No rooms posted by the user.</p>
//         )}
//       </div>

//       <Modal open={isEditModelOpen} onCancel={() => setIsEditModelOpen(false)} onOk={updateHandler} footer={null}>
//         <form className='editRoomForm'>
//           <h3>Edit Your Room Details</h3>
//           <div className='formRow'>
//             <div className='formColumn'>
//               <label htmlFor='address'>Address:</label>
//               <input
//                 type='text'
//                 id='address'
//                 value={updatedRoomData.address}
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, address: e.target.value })}
//               />
//             </div>

//             <div className='formColumn'>
//               <label htmlFor='rent'>Rent:</label>
//               <input
//                 type='number'
//                 id='rent'
//                 value={updatedRoomData.rent}
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, rent: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className='formRow'>
//             <div className='formColumn'>
//               <label htmlFor='phone'>Phone:</label>
//               <input
//                 type='text'
//                 id='phone'
//                 value={updatedRoomData.phone}
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, phone: e.target.value })}
//               />
//             </div>

//             <div className='formColum'>
//               <label htmlFor='phone'>Parking</label>
//               <select className='selectOption'
//                 id="parking"
//                 name="parking"
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, parking: e.target.value })}
//                 value={updatedRoomData.parking}
//               >
//                 <option value="" label="Parking Availability" />
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </div>
//             <div className='formColum'>
//               <label htmlFor='water'>Water</label>
//               <select className='selectOption'
//                 id="water"
//                 name="water"
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, water: e.target.value })}
//                 value={updatedRoomData.water}
//               >
//                 <option value="" label="water" />
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </div>
//             <div className='formColum'>
//               <label htmlFor='floor'>Floor</label>
//               <select className='selectOption'
//                 id="floor"
//                 name="floor"
//                 onChange={(e) => setUpdatedRoomData({ ...updatedRoomData, floor: e.target.value })}
//                 value={updatedRoomData.floor}
//               >
//                 <option value="" label="Floor " />
//                 <option value="1st" label="1st" />
//                 <option value="2nd" label="2nd" />
//                 <option value="3rd" label="3rd" />
//                 <option value="4th" label="4th" />
//                 <option value="5th" label="5th" />
//               </select>
//             </div>

//           </div>

//           <button type='button' onClick={updateHandler} className='updateBtn'>
//             Update
//           </button>
//         </form>
//       </Modal>

//       {/* Are you sure you want to delete modal  */}
//       <Modal
//         open={isDeleteModalOpen}
//         onCancel={() => setIsDeleteModalOpen(false)}
//         onOk={confirmDeleteHandler}
//         okText="Yes"
//         cancelText="No"
//         okButtonProps={{ style: { backgroundColor: '#7371F9', color: '#fff' } }}
//       >
//         <h3>Are you sure you want to delete this room?</h3>
//         <p>This action cannot be undone.</p>
//       </Modal>
//     </>
//   );
// };
// export default Account;















//********************************dashbadr testing *******************************************

import React from 'react'
import '../yourAccount/account.css';
import Menu from './sideMenu/Menu';
import Chart from './chart/Chart';
import { BarChart } from 'recharts';
import LineBarChart from './chart/LineBarChart';
import AreaChartBox from './chart/AreaChartBox';
import CirlcePiChart from './chart/CirlcePiChart';
import { useAuthGloabally } from '../../context/AuthContext';



const Account = () => {
  const [auth, setAuth] = useAuthGloabally();


  return (
    <>
    <div className='accountContainer'>
      <Menu/>
      <div className='grid_account'>
      <div className="box box1">
      {/* <h3>Welcome 🎉{auth.user?.name} </h3> */}
      {auth.user && <h3>Welcome 🎉{auth.user.name} </h3>}
      <h5 style={{textAlign: 'center', margin: '20 20'}}>Disclaimer !</h5>
      <p>"HamroRooms takes user privacy and data security seriously. While every effort is made to protect user data, including phone numbers and addresses, from unauthorized access or disclosure, users are advised to exercise caution when sharing personal information. HamroRooms cannot guarantee absolute security and is not liable for any data leaks or breaches resulting from user actions or external factors beyond our control."</p>
      </div>
      {/* <div className="box box1">New features comming soon....</div> */}
      <div className="box box2"> <Chart/></div>
      <div className="box box3"><Chart/></div>
      <div className="box box4"><CirlcePiChart/></div>
      <div className="box box5"><Chart/></div>
      <div className="box box6"><Chart/></div>
      <div className="box box7"><AreaChartBox/></div>
      <div className="box box8"><LineBarChart/></div>
      <div className="box box9"><LineBarChart/></div>


      </div>
    </div>

    </>
  )
}

export default Account