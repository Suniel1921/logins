// import React, { useEffect, useState } from 'react';
// import '../roomDetails/roomDetails.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { NavLink, useParams } from 'react-router-dom';
// import Features from './Features';
// import Location from './Location';

// const RoomDetails = () => {
//     const { id } = useParams();
//     const [singleRoom, setSingleRoom] = useState({});
//     const [selectedSection, setSelectedSection] = useState("features");

//     const getSingleRoom = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/singleRoom/${id}`);
//             // console.log(response)
//             if (response.data.success) {
//                 setSingleRoom(response.data.singleRoom);
//             }
//             else {
//                 toast.error("something went wrong")
//             }

//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             }
//             else {
//                 toast.error("something went wrong");
//             }

//         }
//     }

//     // useEffect(()=>{
//     //     getSingleRoom();

//     // },[]) //or
//     useEffect(() => {
//         // getSingleRoom();
//         if (id) getSingleRoom();
//     }, [id])


//     return (
//         <>
//             <div className='singleRoomcontainer'>
//                 <h3>{singleRoom.address}</h3>
//                 <div className='roomImage'>
//                     <div className='room'>
//                         <img className='singleImg' src={singleRoom.imageUrl} alt="" />
//                     </div>
//                     <div className='multiroom'>
//                         <div className='twoimg'>
//                             <img src={singleRoom.imageUrl} alt="" />
//                             <img src={singleRoom.imageUrl} alt="" />
//                         </div>
//                         <div className='twoimg'>
//                             <img src={singleRoom.imageUrl} alt="" />
//                             <img src={singleRoom.imageUrl} alt="" /> 
//                         </div>
//                     </div>

//                 </div>

//                 {/* <div className='roomdetails'>
//                 <h5>Address :  {singleRoom.address}</h5>
//                 <h5>Rent{singleRoom.rent}</h5>
//                 <h5>Parking : {singleRoom.parking}</h5>
//                 <h5>Water : {singleRoom.water}</h5>
//                 <h5>Floor : {singleRoom.floor}</h5>
//                 </div> */} 
                


//               {/* Toggle between 'features' and 'location' sections */}
//               <div className='feature_locationContainer'>
//               <h4 onClick={()=> setSelectedSection('features')}>Features</h4>
//               <h4 onClick={()=> setSelectedSection('location')}>Location</h4>
//               </div>
             

//                {/* Conditionally render either FeaturesComponent or LocationComponent */}
//                {selectedSection === 'features' ? (
//                     <Features singleRoom={singleRoom}/>
//                 ) : (
//                     <Location singleRoom={singleRoom}/>
//                 )
//                 }




//             </div>
//         </>
//     )
// }

// export default RoomDetails





// **********in this code added a share on socail media platform*********
import React, { useEffect, useState } from 'react';
import '../roomDetails/roomDetails.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
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

    useEffect(() => {
        if (id) getSingleRoom();
    }, [id])

    // Function to share the room details on social media
    const shareRoom = async (platform) => {
        const shareText = `I found this amazing room located at ${singleRoom.address} on XYZ website. Check it out!`;
        const shareUrl = window.location.href;
        
        // Prepare share content based on selected platform
        let shareContent = {
            title: 'Check out this room!',
            text: shareText,
            url: shareUrl
        };

        // Set specific content for WhatsApp as it doesn't support title field
        if (platform === 'whatsapp') {
            shareContent = {
                text: `${shareText} ${shareUrl}`
            };
        }

        if (navigator.share) {
            try {
                await navigator.share(shareContent);
            } catch (error) {
                console.error(`Error sharing room on ${platform}:`, error);
                toast.error(`Failed to share room on ${platform}. Please try again.`);
            }
        } else {
            // Fallback mechanism for browsers that do not support navigator.share
            // Open a new window with the shareable link
            const shareUrlEncoded = encodeURIComponent(shareUrl);
            let shareLink = '';
            switch (platform) {
                case 'facebook':
                    shareLink = `https://facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`;
                    break;
                case 'twitter':
                    shareLink = `https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${encodeURIComponent(shareText)}`;
                    break;
                case 'whatsapp':
                    // Open WhatsApp with pre-filled message
                    shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                    break;
                default:
                    return;
            }
            window.open(shareLink, '_blank');
        }
    };

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

                <div className='feature_locationContainer'>
                    <h4 onClick={() => setSelectedSection('features')}>Features</h4>
                    <h4 onClick={() => setSelectedSection('location')}>Location</h4>
                </div>

                {selectedSection === 'features' ? (
                    <Features singleRoom={singleRoom}/>
                ) : (
                    <Location singleRoom={singleRoom}/>
                )}

                {/* Buttons/icons to share room on social media */}
                <h3>Share with your friends</h3>
                <div className='socialMediaIcons'>
                    <i style={{color: '#1877F2'}}><FaFacebook onClick={() => shareRoom('facebook')} /></i>
                   <i style={{color:'#1DA1F2'}}> <FaTwitter onClick={() => shareRoom('twitter')} /></i>
                    <i style={{color: '#25D366'}}><FaWhatsapp onClick={() => shareRoom('whatsapp')} /></i>
                    
                </div>
            </div>
        </>
    )
}

export default RoomDetails;
