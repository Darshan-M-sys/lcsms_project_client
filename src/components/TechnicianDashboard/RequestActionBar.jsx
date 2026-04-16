import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RequestActionBar = ({
  request,
  setIsOpen,
  render,
  bill,
  setRender
}) => {
  const {id}=useParams()
  const [status, setStatus] = useState("");
  
  const statusOptions = [
    "Pending",
    "Assigned",
    "In Progress",
    "Completed",
  ];
     const handleStatusUpdate=async(status)=>{
    try {
      if(status){
const res= await axios.put(`http://localhost:5000/api/technician/request/status/update/${id}`,{status:status},{withCredentials:true});
 if(res.data?.success){
 setRender(!render);
}
}
} catch (error) {
      console.log(error.message)
    }
   }
   
 const nav=useNavigate()

   const handleDelete=async(id)=>{
    if(!window.confirm("Are you sure to delete this request"))return;
    try {
      if(id){
     const res= await axios.delete(`http://localhost:5000/api/technician/delete/request/${id}`,{withCredentials:true}) ;
     if(res.status) {
      nav("technician/request/service")
     }
      }
    } catch (error) {
      console.log(error.message)
    }
   }

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded-lg text-sm"
        >
          <option value="">Update Status</option>
          {statusOptions.map((st, index) => (
            <option key={index} value={st}>
              {st}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleStatusUpdate(status)}
          className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          Update
        </button>
      </div>

    {request.status==="Completed" && !bill.requestId &&
    (  <button
        onClick={()=>setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
         Create Bill
      </button>) }
      <button
        onClick={()=>handleDelete(id)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
      >
        Delete Request
      </button>
    </div>
  );
};

export default RequestActionBar;