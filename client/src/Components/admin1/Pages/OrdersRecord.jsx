import React from 'react'
import OrdersTable from '../OrdersTable'

const OrdersRecord = () => {
  return (
    <div className="h-screen">
    <div className="flex justify-center items-center">
      <div className="w-2/3 my-6 md:ml-24 px-10 py-5 rounded-lg">
        <div className="w-full my-11">
        <OrdersTable />
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrdersRecord
