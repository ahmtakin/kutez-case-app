import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Register Swiper modules
SwiperCore.use([Navigation]);

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);

        // Initialize selected colors for each product
        const initialColors = response.data.reduce((acc, product) => {
          acc[product.name] = 'yellow'; // Default color is yellow
          return acc;
        }, {});
        setSelectedColors(initialColors);
      } catch (err) {
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  // Handle color change for a specific product
  const handleColorChange = (productName, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productName]: color, // Update the selected color for the specific product
    }));
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Products Carousel</h1>
      <Swiper
        loop={true} // Enable infinite loop
        spaceBetween={20}
        slidesPerView={1}
        navigation // Enable navigation (arrows)
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="font-bold text-lg">{product.name}</h2>

              {/* Product Image */}
              <img
                src={product.images[selectedColors[product.name]]}
                alt={`${product.name} - ${selectedColors[product.name]}`}
                className="w-full h-48 object-cover mt-4 rounded"
              />

              <p className="mt-4">Popularity: {(product.popularityScore / 100 * 5).toFixed(1)} / 5</p>
              <p>Weight: {product.weight}g</p>

              {/* Color Selector */}
              <div className="mt-4">
                <p className="font-medium">Select Color:</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleColorChange(product.name, 'yellow')}
                    className={`px-4 py-2 border rounded ${
                      selectedColors[product.name] === 'yellow' ? 'bg-yellow-300' : ''
                    }`}
                  >
                    Yellow
                  </button>
                  <button
                    onClick={() => handleColorChange(product.name, 'rose')}
                    className={`px-4 py-2 border rounded ${
                      selectedColors[product.name] === 'rose' ? 'bg-pink-300' : ''
                    }`}
                  >
                    Rose
                  </button>
                  <button
                    onClick={() => handleColorChange(product.name, 'white')}
                    className={`px-4 py-2 border rounded ${
                      selectedColors[product.name] === 'white' ? 'bg-gray-300' : ''
                    }`}
                  >
                    White
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomePage;
