// import React, { useState } from 'react'
// import RoomDetails from './RoomDetails'


// const Location = ({singleRoom}) => {
//   const [loading, setLoading] = useState(true);

//   return (
//     <>
//     <div className='roomdetails'>
//       {/* <h5>Location: {singleRoom.location}</h5> //dynamically show data from database */}
//       {/* Add more location-related details as needed */} 
//     <div>
//   <iframe
//     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28268.777057967753!2d85.25316430481237!3d27.667933485743298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1812d78377ef%3A0x8c37cded908543b!2sKirtipur%2044600!5e0!3m2!1sen!2snp!4v1705823024220!5m2!1sen!2snp"
//     width={600}
//     height={450}
//     style={{ border: '0', width: '100%' }}
//     allowFullScreen={true} 
//     loading="lazy"
//     referrerPolicy="no-referrer-when-downgrade" 
//   ></iframe>
// </div>


//         </div>
//     </>
//   )
// }

// export default Location




import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const Location = ({ singleRoom }) => {
  const [map, setMap] = useState(null);
  const defaultCenter = { lat: singleRoom.latitude, lng: singleRoom.longitude };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.onload = () => {
      setMap(new window.google.maps.Map(document.getElementById('map'), {
        center: defaultCenter,
        zoom: 15
      }));
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [singleRoom]);

  return (
    <div className='roomdetails'>
      <h5>Location: {singleRoom.latitude}</h5>
      <h5>Location: {singleRoom.longitude}</h5>
      <div style={{ height: '400px', width: '100%' }}>
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </div>
    </div>
  );
};

export default Location;

