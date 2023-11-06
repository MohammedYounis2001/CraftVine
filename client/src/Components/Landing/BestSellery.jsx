import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BestSellery = () => {
  const [products, setProducts] = useState([]);

  // fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/All_products")
      .then((response) => {
        // Handle the response data here
        setProducts(response.data.data.slice(0, 3));
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);
// console.log(products);
  return (
    <div className="my-16">
      <h1 className="text-teal-600 text-4xl mb-6 font-bold item-center justify-center text-center">Best Sellery</h1>
      <div className="relative flex flex-wrap gap-7 justify-center items-center mx-16">
        {products.map((product, id) => (
          <div key={id} className="group my-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              to={`/product/${product.product_id}`}
            >
              <img
                className="peer absolute border top-0 right-0 h-full w-full object-cover"
                src={product.image_url}
                alt="product image"
              />
              <img
                className="peer absolute top-0 border -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                src={product.image_url}
                alt="product image"
              />
              {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
            </Link>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl text-start h-8 mb-5 overflow-hidden tracking-tight text-slate-900">
                  {product.product_name}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-lg font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
              </div>
              <button className="w-full flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellery;
