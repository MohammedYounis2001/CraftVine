import React from "react";
import Statistics from "./Statistics";
import UserTable from "./UserTable";
import OrdersTable from "./OrdersTable";
import ProductsTable from "./ProductsTable";

const Dashboard = () => {
  return (
    <div className="h-full">
      <Statistics />
      <div className="lg:ml-72 m-4 my-8 lg:mx-8">
      <h1 className="text-start py-3 font-bold text-xl">Users</h1>
        <UserTable />
      </div>
      <div className="lg:ml-72 m-4 my-8 lg:mx-8">
      <h1 className="text-start py-3 font-bold text-xl">Orders</h1>
        <OrdersTable />
      </div>
      
      <div className="lg:ml-72 m-4 my-8 lg:mx-8">
      <h1 className="text-start py-3 font-bold text-xl">Products</h1>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Dashboard;
