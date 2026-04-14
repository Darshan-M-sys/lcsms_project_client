import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const RequestActionBar = ({
  request,
  setIsOpen,
  render,
  bill,
  setRender,
  technicians = [],
  onDelete,
}) => {
  const {id}=useParams()
  const [selectedTech, setSelectedTech] = useState("");
  const [status, setStatus] = useState("");
   const handleAssignTechnician=async(selectedTech)=>{
    try {
      if(selectedTech){
      const res= await axios.put(`http://localhost:5000/api/admin/assign/technician/${id}`,{technicianId:selectedTech},{withCredentials:true});
 console.log(res.data)
 if(res.data?.success){
 setRender(!render)
 }
      }
    } catch (error) {
      console.log(error.message)
    }
   }
  const statusOptions = [
    "Pending",
    "Assigned",
    "In Progress",
    "Completed",
  ];

     const handleStatusUpdate=async(status)=>{
    try {
      if(status){
      const res= await axios.put(`http://localhost:5000/api/admin/status/update/${id}`,{status:status},{withCredentials:true});
 if(res.data?.success){
 setRender(!render)
 }
      }
    } catch (error) {
      console.log(error.message)
    }
   }

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">

      {/* 🔧 Assign Technician */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Assign:</label>

        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="border p-2 rounded-lg text-sm"
        >
          <option value="">Select Technician</option>

          {technicians.map((tech) => (
            <option key={tech.userId?._id} value={tech._id}>
              {tech.userId?.username}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleAssignTechnician(selectedTech)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Assign
        </button>
      </div>

      {/* 📊 Status Update */}
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

    {request.status==="Completed" &&  !bill.requestId &&
    (  <button
        onClick={()=>setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
         Create Bill
      </button>) }
      <button
        onClick={onDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
      >
        Delete Request
      </button>
    </div>
  );
};

export default RequestActionBar;