import React from 'react'
import '../roomDetails/features.css'

const Features = ({singleRoom}) => {
  return (
    <>
            <div className='roomdetails'>
                {/* <h3>Features</h3> */}
                <table className="features-table">
                    <tbody>
                        <tr>
                            <td className="feature-label">Address:</td>
                            <td>{singleRoom.address}</td>
                        </tr>
                        <tr>
                            <td className="feature-label">Rent:</td>
                            <td>{singleRoom.rent}</td>
                        </tr>
                        <tr>
                            <td className="feature-label">Parking:</td>
                            <td>{singleRoom.parking}</td>
                        </tr>
                        <tr>
                            <td className="feature-label">Water:</td>
                            <td>{singleRoom.water}</td>
                        </tr>
                        <tr>
                            <td className="feature-label">Floor:</td>
                            <td>{singleRoom.floor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
  )
}

export default Features