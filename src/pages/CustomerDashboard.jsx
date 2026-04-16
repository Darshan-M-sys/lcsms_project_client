import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Sidebar from '../components/customerDashboard/Sidebar'
import Stats from '../components/customerDashboard/Stats'
import RecentServices from '../components/customerDashboard/RecentServices'
import axios from 'axios'

const CustomerDashboard = () => {
  const [service,setServices]=useState([])
  const [loading,setLoading]=useState(false)
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/services/request/my/requests",
          { withCredentials: true }
        );
        setServices(res.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchServices();
    }, []);

//  const [stats,setStats]=useState({
//   total:0,
//   pending:0,
//   progress:0,
//   completed:0
//  })
  const stats= {
      total: service.length,
      pending: service.filter((s) => s.status === "Pending").length,
      progress: service.filter((s) => s.status === "In Progress").length,
      completed: service.filter((s) => s.status === "Completed").length,
    };
  
  return (
    <>
    <Header/>
    <div className=" mt-16 flex items-center justify-center bg-gray-100">
      <Sidebar/>
      <div className="mt-[80px] md:ml-64 w-full max-w-7xl p-6">
        <Stats stats={stats}/>
        <RecentServices services={service} />
      </div>
    </div>
    </>
  )
}

export default CustomerDashboard