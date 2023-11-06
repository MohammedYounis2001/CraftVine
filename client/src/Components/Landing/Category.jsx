import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 4; // Number of products per page

  // Static image URLs
  const staticImages = [
    'https://berndah.com/wp-content/uploads/2023/05/artantika02-1024x768.jpeg',
    'https://img.mstaml.com/i169239832502320031/%D8%AA%D8%B5%D8%A7%D9%85%D9%8A%D9%85-%D8%B7%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%B7%D8%B9%D8%A7%D9%85-%D8%AF%D8%A7%D8%A6%D8%B1%D9%8A%D8%A9-%D9%88%D8%A3%D9%81%D9%83%D8%A7%D8%B1-%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85%D9%87%D8%A7-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%AD%D8%A7%D8%AA-%D8%A7%D9%84%D8%B5%D8%BA%D9%8A%D8%B1%D8%A9-%D8%B5%D9%88%D8%B1-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcR4BREc33jEYFeF8OB4ws52jdgYE_9gHtyFIaNqdXAcL2ICCP8QZ1V6VVBk8_cIlOrQ&usqp=CAU',
    'https://i.pinimg.com/736x/3b/01/a4/3b01a4cacda69e60988c3858fe191a4a.jpg',
  ];
 // Static titles
 const staticTitles = [
  'callous',
  'Dining table',
  'bed',
  'wardrobe',
];
  // Fetch products from the API
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        // Set the product data
        setData(response.data.slice(0, 4)); // Limit the data to the first 4 items
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h1 className="text-teal-600 text-4xl mb-6 font-bold item-center justify-center text-center">Category</h1>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-[6rem] ">
        {data.map((item, index) => (
          <Link to={`/category/${item.category}`} key={index}>
            <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full h-64"
                src={staticImages[index]}
                alt={`Static Image ${index + 1}`}
              />
              {/* Additional content here */}
              <div className="absolute inset-0 flex flex-col justify-start px-5 py-4 text-start transition-opacity duration-300">
                <p className=" font-bold text-gray-700 text-1xl" >{staticTitles[index]}</p>
                {/* <p className="text-xs text-teal-600">{item.category}</p> */}
              
                <div className="flex items-center justify-center space-x-3">
                  {/* Additional content here */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
