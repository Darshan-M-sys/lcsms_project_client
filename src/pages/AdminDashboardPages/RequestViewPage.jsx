import React, { useEffect, useState } from 'react'
import Header from '../../components/home/Header'
import AdminSidebar from '../../components/AdminDashboard/AdminSidebar'
import RequestActionBar from '../../components/AdminDashboard/RequestActionBar'
import RequestCard from '../../components/customerDashboard/RequestCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CustomerCard from '../../components/customerDashboard/CoustomerCard'
import StatusTimeLine from '../../components/customerDashboard/StausTimeLine'
import TechnicianCard from '../../components/customerDashboard/TechnicianCard'
import ChatMessageCard from '../../components/customerDashboard/ChatMessageCard'
import CreateBillPopup from '../../components/CreateBillPopup'
import Invoice from '../../components/Invoice'
import BillingStatusBar from '../../components/BillingStatusBar'

const RequestViewPage = () => {
  const [render,setRender]=useState(false)
  const [technicians,setTechnicians]=useState([]);
  const [loading,setLoading]=useState(false)
 const handleGetAllTechnicians=async()=>{
  try {
   const res= await axios.get('http://localhost:5000/api/admin/all/technicians',{withCredentials:true});
   setTechnicians(res.data?.data || [])
   setLoading(true)
  

  } catch (error) {
    console.log(error.message)
  }
 }

 useEffect(()=>{
handleGetAllTechnicians();
 },[loading])

  const [request,setRequest]=useState({});
  const {id}=useParams();
   const handleGetRequest=async()=>{
    try {
      const res= await axios.get(`http://localhost:5000/api/admin/single/requests/${id}`,{withCredentials:true});
     setRequest(res.data?.data || {})
  
    } catch (error) {
      console.log(error.message)
    }
   }
useEffect(()=>{
if(id){
 handleGetRequest(); 
}
},[id,render])
 const [bill,setBill]=useState({})
const handleGetBill =async()=>{
try {
  const res= await axios.get(`http://localhost:5000/api/admin/get/bill/${id}`,{withCredentials:true});
 setBill(res.data?.data || {})
} catch (error) {
 
  console.log(error.message)
}
}
useEffect(()=>{
handleGetBill();
},[id,render])
const [isOpen,setIsOpen]=useState(false)
  return (
    <>
    <Header/>
    <AdminSidebar />
    <div className="md:ml-64 min-h-screen  mt-20">
      <RequestActionBar setIsOpen={setIsOpen} bill={bill} request={request} technicians={technicians} render={render} setRender={setRender} />
      <div className="flex md:flex-row flex-col mt-4 gap-4">
        <RequestCard request={request} />
        <CustomerCard customer={request}/>
      </div>
        {bill.requestId &&   (
        <div className="flex md:flex-row flex-col">
          <div className="w-2/3">
          <Invoice  bill={bill}/>
          </div>
          <div className="w-1/4 m-4">
          <BillingStatusBar bill={bill} render={render} setRender={setRender} setBill={setBill}/>
          </div>
          </div>
          )}
      <div className="flex gap-4 md:flex-row w-full flex-col mt-4 " >
        <div className="bg-orange-100 m-2 mt-4 shadow rounded w-2/3 p-5">
        <h1 className="text-2xl font-bold">Status TimeLine</h1>
        <hr className="border-gray-500 mt-4 "/>
        <StatusTimeLine  timeLineStatus={request.statusHistory}/>
        </div>
        <div>
        <TechnicianCard technician={request.assignedTechnician}/>
        <div className="mt-4 bg-green-300 p-2 rounded-xl">
        <ChatMessageCard messages={request.messages} render={render} setRender={setRender}/>
        <CreateBillPopup isOpen={isOpen } setIsOpen={setIsOpen} render={render} setRender={setRender}/>
        </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    </>
  )
}

export default RequestViewPage