import React, { useState, useEffect } from "react";
import axios from "axios";

const Offers = () => {
  const [users, setUsers] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;
  const totalPages = Math.ceil(users.length / productPerPage);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentItems = users.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / productPerPage); i++) {
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

  useEffect(() => {
    async function fetchUsers() {
      axios
        .get("http://localhost:5000/admin/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center">
        <div className="w-2/3 my-6 md:ml-24 px-10 py-5 rounded-lg">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                      <tr>
                        <th scope="col" className="px-6 py-2">
                          #
                        </th>
                        <th scope="col" className="px-6 py-2">
                          Product Id
                        </th>
                        <th scope="col" className="px-6 py-2">
                          Discount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, id) => (
                        <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                          <td className="whitespace-nowrap px-6 py-2 font-medium">
                            {user.user_id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-2">
                            {user.first_name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-2">
                            {user.last_name}
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
                              Math.ceil(users.length / productPerPage)
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
      </div>
    </div>
  );
};

export default Offers;
