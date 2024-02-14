import React, { useEffect, useState } from 'react';
import CategoryList from '../../components/scrollCategory/CategoryList';
import '../home/home.css';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearchGlobally } from '../../context/SearchContext';

const Home = () => {
  const { searchQuery, setSearchQuery } = useSearchGlobally();

  const [isLoading, setIsLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const navigate = useNavigate();

  const getAllRoom = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/getAllRoom`);
      if (response.data.success) {
        setRoomList(response.data.allRoom);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  useEffect(() => {
  }, [roomList]);

  useEffect(() => {
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAllClick = () => {
    setSelectedCategory(null);
  };

  const filteredRoomList = roomList.filter((room) =>
    (!selectedCategory || room.city._id.toString() === selectedCategory._id) &&
    room.rent >= priceRange[0] &&
    room.rent <= priceRange[1] &&
    // room.city.name.toLowerCase().includes(searchQuery.toLowerCase()) // search by city
    room.address.toLowerCase().includes(searchQuery.toLowerCase()) //search by address
  );

  return (
    <>
      <div className='scrollCategory'>
        <CategoryList
          onCategoryClick={handleCategoryClick}
          onAllClick={handleAllClick}
          products={products}
          setPriceRange={setPriceRange}
        />
      </div>

      <section className='mainSection'>
        <div className='cardParents'>
          {isLoading ? (
            <>
              {[...Array(8)].map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {filteredRoomList.length === 0 ? (
                <div className='roomNotFound'><h2>Oops! 🤔 No Room Found!</h2></div>
              ) : (
                <>
                  {filteredRoomList.map((room) => (
                    <div className='chilCard' key={room._id} onClick={() => navigate(`/roomDetails/${room._id}`)}>
                      <img src={room.imageUrl} alt='room image' loading="lazy"  />
                      <h3>{room.address}</h3>
                      <p>Rent.{room.rent}/month</p>
                      <p>{room.city.name}</p>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;


