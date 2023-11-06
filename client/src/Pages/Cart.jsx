import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CounterCard from '../Components/CounterCard';
import { Link } from 'react-router-dom';
 


const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setCartProduct(response.data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleQuantityChange = (productId, quantityChange) => {
    setCartProduct((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          // Create a new object with the updated quantity
          return { ...item, quantity: item.quantity + quantityChange };
        }
        return item;
      });

      // If you need to update the server as well, you can make an Axios request here.
      axios
        .patch(`https://fakestoreapi.com/products${productId}`, {
          quantity: updatedCart.find((item) => item.id === productId).quantity,
        })
        .then((response) => {
          // Handle the successful update on the server if needed.
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });

      return updatedCart;
    });
  };

  const handleRemoveItem = (productId) => {
    // You can make an Axios request to remove the item from the cart on the server.
    axios.delete(`https://fakestoreapi.com/products${productId}`)
      .then((response) => {
        // Handle the successful removal on the server if needed.
        // You can also remove the item locally from the cartProduct state.
        const updatedCart = cartProduct.filter((item) => item.id !== productId);
        setCartProduct(updatedCart);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <section className="h-full bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-[#17403C] ">Your Cart</h1>
        </div>

        {cartProduct.length > 0 ? (
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {cartProduct.map((product) => (
                      <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0" key={product.id}>
                        <div className="shrink-0">
                          <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={product.image} alt="" />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">{product.title}</p>
                              <p className="mt-1 text-xs text-gray-700">{product.size}</p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">{product.price}</p>

                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <CounterCard/>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button type="button" onClick={() => handleRemoveItem(product.id)} className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">${
                      cartProduct.reduce((total, product) => total + product.price * product.quantity, 0)
                    }</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$8.00</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span> ${
                    cartProduct.reduce((total, product) => total + product.price * product.quantity, 0) + 8
                  }</p>
                </div>

                <div className="mt-6 text-center">
                  
                <Link to="/payment">
      <button
        type="button"
        className="w-50 rounded-3xl py-4 font-semibold text-white text-align transition-colors bg-teal-600 hover:bg-teal-400 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-neutral-200 px-7 dark:bg-white dark:text-black h-6 my-8 flex flex-col justify-center text-center mx-auto"
      >
        Checkout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </section>
  );
};

export default Cart;