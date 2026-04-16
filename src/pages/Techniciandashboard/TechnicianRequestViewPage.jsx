import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import Header from '../../components/home/Header'
import SideBar from '../../components/TechnicianDashboard/SideBar'
import RequestCard from '../../components/customerDashboard/RequestCard'
import CustomerCard from '../../components/customerDashboard/CoustomerCard';
import StatusTimeLine from '../../components/customerDashboard/StausTimeLine';
import ChatMessageCard from '../../components/customerDashboard/ChatMessageCard';
import RequestActionBar from '../../components/TechnicianDashboard/RequestActionBar';
import TechnicianCard from '../../components/customerDashboard/TechnicianCard';
import Invoice from "../../components/Invoice"
import BillingStatusBar from '../../components/TechnicianDashboard/BillingStatusBar';
import BillCreatePopup from '../../components/TechnicianDashboard/BillCreatePopup';

const TechnicianRequestViewPage = () => {
    const [render,setRender]=useState(false)
    const [request,setRequest]=React.useState({});
    const { id } = useParams();
    const handleGetRequest = async () => {
   try {
    const res= await axios.get(`http://localhost:5000/api/technician/get/request/${id}`,{withCredentials:true});
    setRequest(res.data?.data || {});
    console.log(res.data?.data )
   } catch (error) {
    console.log(error);
   }
    }
  
    React.useEffect(() => {
      if(id){
        handleGetRequest();
      }
    }, [id,render]);
  
  
     const [bill,setBill]=useState({})
    const handleGetBill =async()=>{
    try {
      const res= await axios.get(`http://localhost:5000/api/technician/get/bill/${id}`,{withCredentials:true});
     setBill(res.data?.data || {})
     console.log(res.data?.data || " this one is not getting in  this API router" )
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
    <SideBar/>
    {isOpen && (
      <BillCreatePopup setIsOpen={setIsOpen} isOpen={isOpen} render={render} setRender={setRender}/>
    )}
    <div className="md:ml-64 mt-20 min-h-screen">
      <RequestActionBar   request={request} bill={bill} render={render} setRender={setRender} setIsOpen={setIsOpen}/>
      <div className="flex mt-4  md:flex-row flex-col gap-2">
      <RequestCard request={request}/>
      <CustomerCard customer={request}/>
      </div>
      {bill.requestId && (
        <div className="flex w-full mt-4 gap-2 justify-center">
          <Invoice bill={bill}/>
        
            <div className="w-1/3 mt-4">
              <BillingStatusBar bill={bill} render={render} setRender={setRender}/>
            </div>
          </div>
      )}
      <div className="flex w-full md:flex-row flex-col justify-between mt-4 gap-4">
<div className="bg-orange-100 w-full m-2  p-2 rounded"> 
  <h1 className="text-2xl font-bold ml-4">Status TimeLine</h1>
  <hr  className="mt-4 border-gray-500"/>
  <StatusTimeLine timeLineStatus={request.statusHistory} render={render} setRender={setRender}/>
</div>
<div className="mt-4 md:w-1/3 w-full">
  <TechnicianCard technician={request.assignedTechnician}/>
<div className=" bg-green-200 p-2 mt-4 rounded-2xl ">
  <ChatMessageCard messages={request.messages} render={render} setRender={setRender}/>
</div>
</div>
</div>
    </div>
</>
  )
}
export default TechnicianRequestViewPage
