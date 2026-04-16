import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import AdminSidebar from '../components/AdminDashboard/AdminSidebar'
import Stats from '../components/AdminDashboard/Stats'
import axios from 'axios'
import RequestsList from '../components/AdminDashboard/RequestList'


const AdminDashboard = () => {
  const [service,setServices]=useState([]);
  const [loading,setLoading]=useState(false)
  const [stats,setStats]=useState({});
  const handleGetStats=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/api/admin/stats",{withCredentials:true});
      setStats(res.data|| {})
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    handleGetStats();
  },[])


    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/all/requests",
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

  return (
   <>
   <Header/>
   <AdminSidebar/>
   <div className="mt-20 md:ml-64">
    <Stats stats={stats}/>
  <RequestsList  services={service}/>
   </div>
   </>
  )
}

export default AdminDashboard