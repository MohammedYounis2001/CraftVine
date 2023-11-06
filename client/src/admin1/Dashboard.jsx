import React from 'react'
import Statistics from './Statistics'
import UserTable from './UserTable'

const Dashboard = () => {
  return (
    <div className='h-screen'>
      <Statistics/>
      <UserTable />
    </div>
  )
}

export default Dashboard
