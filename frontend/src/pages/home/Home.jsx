import React, { useEffect, useState } from 'react';
import CategoryList from '../../components/scrollCategory/CategoryList';
import '../home/home.css';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearchGlobally } from '../../context/SearchContext';


const Home = () => {
  const {searchQuery, setSearchQuery} = useSearchGlobally();

  // State to handle loading state of room list
  const [isLoading, setIsLoading] = useState(true);

  // State to store the list of rooms
  const [roomList, setRoomList] = useState([]);

  // State to store the currently selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State to store the list of products (not used in the current code)
  const [products, setProducts] = useState([]);

  // State to manage the price range filter
  const [priceRange, setPriceRange] = useState([0, 20000]); // Default price range
  const navigate = useNavigate();




  // Function to fetch all rooms from the server
  const getAllRoom = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/getAllRoom`);
      if (response.data.success) {
        // Set the fetched room list to state
        setRoomList(response.data.allRoom);
      }
    } catch (error) {
      // Handle errors during room fetching
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      // Set loading state to false after room data is fetched
      setIsLoading(false);
    }
  };

  // UseEffect to fetch room data when the component mounts
  useEffect(() => {
    getAllRoom();
  }, []); // Run only once when the component mounts

  // UseEffect to log changes in selectedCategory or priceRange
  useEffect(() => {
    // console.log("Selected Category changed:", selectedCategory);
    // console.log("Price Range changed:", priceRange);
  }, [selectedCategory, priceRange]);

  // Function to handle category click
  const handleCategoryClick = (category) => {
    // console.log("Category clicked:", category);
    setSelectedCategory(category);
  };

  // Function to handle "All" click and reset the selected category
  const handleAllClick = () => {
    setSelectedCategory(null);
  };

  // Filter the room list based on selectedCategory and priceRange
  const filteredRoomList = selectedCategory
  ? roomList.filter((room) =>
      room.city === selectedCategory._id &&
      room.rent >= priceRange[0] &&
      room.rent <= priceRange[1] &&
      room.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : roomList.filter((room) =>
      room.rent >= priceRange[0] &&
      room.rent <= priceRange[1] &&
      room.address.toLowerCase().includes(searchQuery.toLowerCase())
    );


  return (
    <>
      {/* Category List Section */}
      <div className='scrollCategory'>
        <CategoryList
          onCategoryClick={handleCategoryClick}
          onAllClick={handleAllClick}
          products={products}
          setPriceRange={setPriceRange}
        />
      </div>

      {/* Main Section for Displaying Room Cards */}
      <section className='mainSection'>
        <div className='cardParents'>
          {isLoading ? (
            // Render skeleton loading cards when still loading
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            // Render room cards based on the filtered room list
            <>
              {filteredRoomList.length === 0 ? (
                // Render a message if no products found in the selected price range
                <div className='roomNotFound'><h2>oops! 🤔  No Room Found !</h2></div>
              ) : (
                // Render room cards with room details
                filteredRoomList.map((room) => (
                  <div className="chilCard" key={room.id} onClick={()=> navigate(`/roomDetails/${room._id}`)}>
                    <img src={room.imageUrl} alt="room image" />
                    <h3>{room.address}</h3>
                    <p>Rs.{room.rent}</p>
                    <p>{room.city}</p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;




