import React from "react";
import UserTable from '../UserTable';

const User = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center">
        <div className="w-2/3 my-6 md:ml-24 px-10 py-5 rounded-lg">
          <button className="w-auto py-2 px-3 bg-teal-600 text-white rounded-xl mt-2 flex items-end">
            Add User
          </button>
          <div className="w-full my-11">
          <UserTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
