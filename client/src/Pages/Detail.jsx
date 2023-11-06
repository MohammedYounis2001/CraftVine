import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Related from '../Components/website/Related';

const ProductSection = () => {
    const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [blogPost, setBlogPost] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [error, setError] = useState([]);




  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/carts', {
        "quantity" : blogPost.quantity,
        "product_id" : id
          });
      if (response.status === 201) {
        alert("Added to cart successfully!");
        setCart([...cart, blogPost]);
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
      
    }
  };
  
  const addToFavorite = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/favorite', {
        "producr_id" : id
          
        
      });
      if (response.status === 201) {
        alert("Added to favorite successfully!");
        setFavorite([ ...favorite, blogPost]);
      }
    } catch (error) {
      console.log("Error adding to favorite:", error);
      
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/Get_Product_By_Id/${id}`)
      .then((response) => {
        setBlogPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("An error occurred. Please try again.");
      });
  }, [id]);

 

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-40 mx-auto" >
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={blogPost.product_name}
            className="lg:w-80 w-full h-96 object-cover object-center rounded border border-teal-600 hover:z-50 transition-transform duration-300 transform hover:scale-150"
            src={blogPost.image_url}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-4">{blogPost.product_name}</h1>
            <div className="flex mb-4">
              <span className="text-gray-600 ml-2">{blogPost.average_rating} /5</span>
            </div>
            <p className="leading-relaxed text-left">{blogPost.description}</p>
            <div className="flex mt-6 justify-between pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex items-center justify-between">
                <span className="mr-3">Color</span>
                
                {/* {blogPost.map(( blogs,index ) => (

                <>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" key={index}>{blogs.product_color}</button>
                </>
                 ))} */}
                <div className="flex ml-6 items-center">
                 
                  <button onClick={decreaseQuantity} className="border-2 w-6 h-6 focus:outline-none">-</button>
                  <input
                    type="text"
                    value={quantity}
                    className="border-2 border-gray-300 w-10 h-6 text-center focus:outline-none"
                    readOnly
                  />
                  <button onClick={increaseQuantity} className="bg-teal-600 w-6 h-6 focus:outline-none">+</button>
                </div>
              </div>
              <div className="flex ml-6 items-center">
                <div className="relative">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">{blogPost.price}</span>
              <button  onClick={addToCart} className="flex ml-auto text-white bg-teal-600 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded">
                Add to Cart
              </button>

              <button onClick={addToFavorite} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='my-20'>
        <Related  category={blogPost.category}/>
      </div>
    </section>
  );
};

export default ProductSection;
