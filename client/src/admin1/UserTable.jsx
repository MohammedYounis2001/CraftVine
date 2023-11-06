import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
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
    <div className="lg:ml-72 m-4 my-8 lg:mx-8">
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
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Remove
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
                      <td className="whitespace-nowrap px-6 py-2">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        <button className="p-3 bg-gray-50 border-teal-600 ml-4 border font-bold text-white  rounded-md">
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
