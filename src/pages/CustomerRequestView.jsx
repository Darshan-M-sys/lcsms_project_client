import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RequestCard from '../components/customerDashboard/RequestCard';
import CustomerCard from '../components/customerDashboard/CoustomerCard';
import Header from '../components/home/Header';
import Sidebar from '../components/customerDashboard/Sidebar';
import TechnicianCard from '../components/customerDashboard/TechnicianCard';
import StatusTimeLine from '../components/customerDashboard/StausTimeLine';
import ChatMessageCard from '../components/customerDashboard/ChatMessageCard';
import Invoice from '../components/Invoice';

const CustomerRequestView = () => {
  const [render,setRender]=useState(false)
  const [request,setRequest]=React.useState({});
  const { id } = useParams();
  const handleGetRequest = async () => {
 try {
  const res= await axios.get(`http://localhost:5000/api/services/request/my/requests/${id}`,{withCredentials:true});
  setRequest(res.data?.data || {});
 } catch (error) {
  console.log(error);
 }
  }

  React.useEffect(() => {
    if(id){
      handleGetRequest();
    }
    handleGetRequest();
  }, [id,render]);


   const [bill,setBill]=useState({})
  const handleGetBill =async()=>{
  try {
    const res= await axios.get(`http://localhost:5000/api/services/request/get/bill/${id}`,{withCredentials:true});
   setBill(res.data?.data || {})
   console.log(res.data?.data)
  } catch (error) {
    console.log(error.message)
  }
  }
  useEffect(()=>{
  handleGetBill();
  },[id,render])

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='mt-20 md:ml-[250px] p-5'>
 <div className='flex flex-col md:flex-row gap-5'>
      <RequestCard request={request} />
      <CustomerCard customer={request} />   
</div>
{bill.requestId && (
  <Invoice bill={bill}/>
)}
<div className='flex flex-col md:flex-row  gap-5 mt-5'>
  <div className='md:w-2/3 bg-orange-100 p-4 rounded-xl shadow-md border border-gray-200' >
  <h1 className="text-xl font-bold">Request Status Timeline</h1>
  <hr className="my-2 border-gray-300" />
  <StatusTimeLine timeLineStatus={request.statusHistory} />
  </div>
  <div className='md:w-1/3' >
  <TechnicianCard technician={request.assignedTechnician} /> 
  <hr className="my-4 border-gray-300" />
  <div className='mt-5 bg-green-100 p-4 rounded-xl shadow-md border border-gray-200' >
  <ChatMessageCard messages={request.messages} render={render} setRender={setRender}/> 
  </div>
  </div>
</div>
    </div>
    </>
  )
}

export default CustomerRequestView