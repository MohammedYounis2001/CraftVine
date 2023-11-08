import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = () => {
    const [users, setUsers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [products, setProducts] = useState(0);

    useEffect(() => {
      async function fetchUsers() {
        axios.get("http://localhost:5000/admin/users")
        .then((response) => {
            setUsers(response.data.length);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      async function fetchOrders() {
        axios.get("http://localhost:5000/admin/all_orders")
        .then((response) => {
            setOrders(response.data.length);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      async function fetchProducts() {
        axios.get("http://localhost:5000/admin/all_product")
        .then((response) => {
            setProducts(response.data.length);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      fetchUsers();
      fetchOrders();
      fetchProducts();
    }, []);
  return (
    <div>
      <div className="flex w-full">
        <div className="flex flex-col lg:flex-row gap-7 w-full lg:ml-72 m-4 my-8 lg:mx-8">
          <div class="w-full relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:w-1/3">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />{" "}
              </svg>
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Customers
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {users}
              </h4>
            </div>
          </div>
          <div class="w-full relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:w-1/3">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />{" "}
              </svg>
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Orders Recieved
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {orders}
              </h4>
            </div>
          </div>
          <div class="w-full relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:w-1/3">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />{" "}
              </svg>
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Products in this website
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {products}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
