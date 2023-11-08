import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsTable = ({ handleEdit }) => {
  const [products, setProducts] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;
  const totalPages = Math.ceil(products.length / productPerPage);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentItems = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisibleButtons = 4;
  const indexOfLastButton = Math.min(
    Math.max(currentPage + maxVisibleButtons - 1, maxVisibleButtons),
    pageNumbers.length
  );
  const indexOfFirstButton = Math.max(indexOfLastButton - maxVisibleButtons, 0);

  const visiblePageNumbers = pageNumbers.slice(
    indexOfFirstButton,
    indexOfLastButton
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // end of pagination

  function handleDelete(id){
    axios
        .post(`http://localhost:5000/admin/Delete_Product_By_Id/${id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }

  useEffect(() => {
    async function fetchProducts() {
      axios
        .get("http://localhost:5000/admin/all_product")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-2">
                      #
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, id) => (
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      <td className="whitespace-nowrap px-6 py-2 font-medium">
                        {product.product_id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {product.product_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {product.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        <button 
                        onClick={handleEdit}
                        className="p-3 bg-gray-50 border-teal-600 ml-4 border font-bold  rounded-md">
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            {" "}
                            <path stroke="none" d="M0 0h24v24H0z" />{" "}
                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                            <line x1="16" y1="5" x2="19" y2="8" />
                          </svg>
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        <button 
                        onClick={handleDelete(product.product_id)}
                        className="p-3 bg-gray-50 border-teal-600 ml-4 border font-bold  rounded-md">
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />{" "}
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <div className="flex justify-center">
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 px-4 py-2 border text-black rounded-lg shadow "
                      >
                        Previous Page
                      </button>
                      <ul className="flex list-none">
                        {visiblePageNumbers.map((number) => (
                          <li key={number} className="mx-1">
                            <button
                              onClick={() => paginate(number)}
                              className={`${
                                currentPage === number
                                  ? "text-teal-800 w-10 font-bold"
                                  : "text-black w-10"
                              } py-2 px-3 focus:outline-none rounded-lg`}
                            >
                              {number}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(products.length / productPerPage)
                        }
                        className="px-4 py-2 border text-black rounded-lg shadow"
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
