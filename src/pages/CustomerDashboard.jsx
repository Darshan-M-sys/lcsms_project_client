import React from 'react'
import Header from '../components/home/Header'
import Sidebar from '../components/customerDashboard/Sidebar'
import Stats from '../components/customerDashboard/Stats'
import RecentServices from '../components/customerDashboard/RecentServices'

const CustomerDashboard = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen mt-16 flex items-center justify-center bg-gray-100">
      <Sidebar/>
      <div className="mt-[80px] md:ml-64 w-full max-w-7xl p-6">
        <Stats/>
        <RecentServices/>
      </div>
    </div>
    </>
  )
}

export default CustomerDashboard