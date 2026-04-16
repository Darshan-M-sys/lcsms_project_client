import React, { useEffect, useState } from 'react'
import Header from '../../components/home/Header'

import SideBar from '../../components/TechnicianDashboard/SideBar'
import TechnicianStats from '../../components/TechnicianDashboard/TechnicianStats'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RequestsList from '../../components/TechnicianDashboard/RequestsList'

const TechnicianDashboard = () => {
    const [service,setServices]=useState([]);
    const [loading,setLoading]=useState(false)
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/technician/get/all/assigned/requests",
          { withCredentials: true }
        );
        setServices(res.data?.data || []);
        console.log(res.data?.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchServices();
    }, []);
  

        const stats= {
      total: service.length,
      pending: service.filter((s) => s.status === "Pending").length,
      progress: service.filter((s) => s.status === "In Progress").length,
      completed: service.filter((s) => s.status === "Completed").length,
    };

    
  return (
    <>
    <Header/>
    <SideBar/>
    <div className="md:ml-64 mt-16">
   <TechnicianStats stats={stats} />
   <RequestsList services={service}/>
    </div>
    </>
  )
}

export default TechnicianDashboard