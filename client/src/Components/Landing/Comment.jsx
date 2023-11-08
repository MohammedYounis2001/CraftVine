import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Comment = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
   
  
    // Static image URLs
   
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
      //error 
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
        <div>
        <form>
          <input
            type="checkbox"
            id=""
            className="hidden"
            style={{ display: "none" }}
            name="botcheck"
          />
          <div className="mb-5">
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="false"
              className="w-full px-4 py-3 border-2 placeholder:text-neutral-800 dark:text-white rounded-md outline-none dark:placeholder:text-neutral-200 dark:bg-neutral-900 focus:ring-4 border-neutral-300 focus:border-neutral-600 ring-neutral-100 dark:border-neutral-600 dark:focus:border-white dark:ring-0"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email_address" className="sr-only">
              Email Address
            </label>
            <input
              id="email_address"
              type="email"
              placeholder="Email Address"
              autoComplete="false"
              className="w-full px-4 py-3 border-2 placeholder:text-neutral-800 dark:text-white rounded-md outline-none dark:placeholder:text-neutral-200 dark:bg-neutral-900   focus:ring-4  border-neutral-300 focus:border-neutral-600 ring-neutral-100 dark:border-neutral-600 dark:focus:border-white dark:ring-0"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-3 border-2 placeholder:text-neutral-800 dark:text-white dark:placeholder:text-neutral-200 dark:bg-neutral-900   rounded-md outline-none  h-36 focus:ring-4  border-neutral-300 focus:border-neutral-600 ring-neutral-100 dark:border-neutral-600 dark:focus:border-white dark:ring-0"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-50 rounded-3xl py-4 font-semibold text-white text-align transition-colors bg-teal-600 hover:bg-teal-400 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-neutral-200 px-7 dark:bg-white dark:text-black h-6 my-8 flex flex-col justify-center text-center mx-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  };
  
  export default Comment;