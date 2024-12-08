import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwiperCore, { Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Register Swiper modules
SwiperCore.use([Navigation, Controller]);
const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [mainSwiper, setMainSwiper] = useState(null); // Main Swiper instance
  const [thumbSwiper, setThumbSwiper] = useState(null); // Thumbnail Swiper instance

  // Fetch products with dynamic prices from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        console.log('Fetched products:', response.data); // Debug log
        setProducts(response.data);

        // Initialize selected colors for each product
        const initialColors = response.data.reduce((acc, product) => {
          acc[product.name] = 'yellow'; // Default color is yellow
          return acc;
        }, {});
        setSelectedColors(initialColors);
      } catch (err) {
        console.error('Error fetching products:', err.message);
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

  const renderStars = (score) => {
    const normalizedScore = (score / 100) * 5; // Normalize score to a range of 5
    const totalStars = 5;
    const filledStars = Math.floor(normalizedScore); // Number of completely filled stars
    const hasPartialStar = normalizedScore % 1 !== 0; // Check if there's a fraction
    const partialStarWidth = Math.round((normalizedScore % 1) * 100); // Fractional width in percentage
  
    return Array.from({ length: totalStars }).map((_, index) => {
      if (index < filledStars) {
        // Fully filled star
        return <span key={index} className="star filled">★</span>;
      } else if (index === filledStars && hasPartialStar) {
        // Partially filled star
        return (
          <span
            key={index}
            className="star partial"
            style={{
              background: `linear-gradient(90deg, #FFD700 ${partialStarWidth}%, #E0E0E0 ${partialStarWidth}%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ★
          </span>
        );
      } else {
        // Empty star
        return <span key={index} className="star empty">★</span>;
      }
    });
  };
  

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-center">Loading products...</p>; // Loading state
  }

  return (
    <div className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
      <h1 className="page-title">
        Product List 
      </h1>
      {/* Main Product Swiper */}
      <Swiper
        loop={true}
        spaceBetween={20}
        slidesPerView={1} // Default for smallest screens
        navigation
        onSwiper={setMainSwiper} // Link main Swiper instance
        onSlideChange={(swiper) => {
          // Update handle position when the slide changes
          const progress = swiper.realIndex / (products.length - 1);
          const handle = document.getElementById('progress-handle');
          const barWidth = document.getElementById('progress-bar-container').offsetWidth;
          handle.style.left = `${progress * barWidth}px`;
        }}
        breakpoints={{
          640: { slidesPerView: 1 }, // 1 image for screens 640px and above
          768: { slidesPerView: 2 }, // 2 images for screens 768px and above
          1024: { slidesPerView: 4 }, // 4 images for screens 1024px and above
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-card">
              {/* Product Image */}
              <div
                className="image-container"
                style={{
                  display: 'flex', // Enables flexbox
                  justifyContent: 'center', // Centers the image horizontally
                  alignItems: 'center', // Centers the image vertically
                  marginBottom: '10px', // Spacing below the image
                }}
              >
              <img
                src={product.images[selectedColors[product.name]] || 'https://via.placeholder.com/150'}
                alt={`${product.name} - ${selectedColors[product.name]}`}
                className="product-image"
              />
              </div>

                {/* Product Name */}
              <h2 className="product-name">
                {product.name}
              </h2>
              {/* Product Price */}
              <p className="product-price">${product.price} USD</p>

              {/* Color Selector */}
              <div className="color-options mt-4">
                <div
                  onClick={() => handleColorChange(product.name, 'yellow')}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#E6CA97',
                    border:
                      selectedColors[product.name] === 'yellow'
                        ? '2px solid #000'
                        : '2px solid transparent',
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                ></div>
                <div
                  onClick={() => handleColorChange(product.name, 'white')}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#D9D9D9',
                    border:
                      selectedColors[product.name] === 'white'
                        ? '2px solid #000'
                        : '2px solid transparent',
                    cursor: 'pointer',
                    display: 'inline-block',
                    marginLeft: '10px',
                  }}
                ></div>
                <div
                  onClick={() => handleColorChange(product.name, 'rose')}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#E1A4A9',
                    border:
                      selectedColors[product.name] === 'rose'
                        ? '2px solid #000'
                        : '2px solid transparent',
                    cursor: 'pointer',
                    display: 'inline-block',
                    marginLeft: '10px',
                  }}
                ></div>
              </div>
              {/* Selected Color Display */}
              <p className="selected-color">
                {selectedColors[product.name] === 'yellow'
                  ? 'Yellow Gold'
                  : selectedColors[product.name] === 'white'
                  ? 'White Gold'
                  : 'Rose Gold'}
              </p>
              {/* Product Rating */}
              <div className="product-rating">
                {renderStars(product.popularityScore)}
                <span>
                  {((product.popularityScore / 100) * 5).toFixed(1)} / 5
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
        {/* Progress Bar with Draggable Handle */}
        <div
          id="progress-bar-container"
          className="progress-bar-container"
          onClick={(e) => {
            // Calculate slide based on click position
            const bar = e.currentTarget;
            const clickX = e.nativeEvent.offsetX;
            const barWidth = bar.offsetWidth;
            const progress = clickX / barWidth;
            const targetIndex = Math.round(progress * (products.length - 1));
            mainSwiper?.slideToLoop(targetIndex); // Navigate to corresponding slide in the loop
          }}
        >
          {/* Draggable Handle */}
          <div
            id="progress-handle"
            className="progress-handle"
            
            draggable="true"
            onDrag={(e) => {
              // Handle dragging behavior
              const bar = document.getElementById('progress-bar-container');
              const barWidth = bar.offsetWidth;
              const handleX = e.clientX - bar.getBoundingClientRect().left;

              // Ensure handle stays within bounds
              if (handleX >= 0 && handleX <= barWidth) {
                const handle = document.getElementById('progress-handle');
                handle.style.left = `${handleX}px`;

                // Update Swiper based on handle position
                const progress = handleX / barWidth;
                const targetIndex = Math.round(progress * (products.length - 1));
                mainSwiper?.slideToLoop(targetIndex); // Use `slideToLoop` for loop navigation
              }
            }}
            onDragEnd={(e) => {
              // Snap the handle to the nearest slide on drag end
              const bar = document.getElementById('progress-bar-container');
              const barWidth = bar.offsetWidth;
              const handleX = e.clientX - bar.getBoundingClientRect().left;

              // Ensure handle stays within bounds
              if (handleX >= 0 && handleX <= barWidth) {
                const progress = handleX / barWidth;
                const targetIndex = Math.round(progress * (products.length - 1));
                mainSwiper?.slideToLoop(targetIndex); // Use `slideToLoop` for loop navigation
              }
            }}
          ></div>
        </div>
    </div>
  );
};

export default HomePage;
