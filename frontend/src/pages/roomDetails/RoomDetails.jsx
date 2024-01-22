import React, { useEffect, useState } from 'react';
import '../roomDetails/roomDetails.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import Features from './Features';
import Location from './Location';

const RoomDetails = () => {
    const { id } = useParams();
    const [singleRoom, setSingleRoom] = useState({});
    const [selectedSection, setSelectedSection] = useState("features");

    const getSingleRoom = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/singleRoom/${id}`);
            // console.log(response)
            if (response.data.success) {
                setSingleRoom(response.data.singleRoom);
            }
            else {
                toast.error("something went wrong")
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error("something went wrong");
            }

        }
    }

    // useEffect(()=>{
    //     getSingleRoom();

    // },[]) //or
    useEffect(() => {
        // getSingleRoom();
        if (id) getSingleRoom();
    }, [id])


    return (
        <>
            <div className='singleRoomcontainer'>
                <h3>{singleRoom.address}</h3>
                <div className='roomImage'>
                    <div className='room'>
                        <img className='singleImg' src={singleRoom.imageUrl} alt="" />
                    </div>
                    <div className='multiroom'>
                        <div className='twoimg'>
                            <img src={singleRoom.imageUrl} alt="" />
                            <img src={singleRoom.imageUrl} alt="" />
                        </div>
                        <div className='twoimg'>
                            <img src={singleRoom.imageUrl} alt="" />
                            <img src={singleRoom.imageUrl} alt="" /> 
                        </div>
                    </div>

                </div>

                {/* <div className='roomdetails'>
                <h5>Address :  {singleRoom.address}</h5>
                <h5>Rent{singleRoom.rent}</h5>
                <h5>Parking : {singleRoom.parking}</h5>
                <h5>Water : {singleRoom.water}</h5>
                <h5>Floor : {singleRoom.floor}</h5>
                </div> */} 
                


              {/* Toggle between 'features' and 'location' sections */}
              <div className='feature_locationContainer'>
              <h4 onClick={()=> setSelectedSection('features')}>Features</h4>
              <h4 onClick={()=> setSelectedSection('location')}>Location</h4>
              </div>
             

               {/* Conditionally render either FeaturesComponent or LocationComponent */}
               {selectedSection === 'features' ? (
                    <Features singleRoom={singleRoom}/>
                ) : (
                    <Location singleRoom={singleRoom}/>
                )
                }




            </div>
        </>
    )
}

export default RoomDetails


