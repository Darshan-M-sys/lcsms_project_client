import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard/AdminSidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CustomerPage = () => {
  // // 🔥 Static data
  // const [technicians, setTechnicians] = useState([
  //   {
  //     id: 1,
  //     fullName: "Rahul Kumar",
  //     email: "rahul@gmail.com",
  //     phone: "9876543210",
  //     city: "Bangalore",
  //     experience: "4 Years",
  //     skills: ["Laptop Repair", "Hardware"],
  //     status: "Available",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Amit Sharma",
  //     email: "amit@gmail.com",
  //     phone: "9876501234",
  //     city: "Mysore",
  //     experience: "3 Years",
  //     skills: ["Software", "OS Install"],
  //     status: "Busy",
  //   },
  // ]);
  const nav=useNavigate();
  const [customers,setCustomers]=useState([]);
 const handleGetAllCustomer=async()=>{
  try {
   const res= await axios.get('http://localhost:5000/api/admin/get/all/customer',{withCredentials:true});
   setCustomers(res.data?.data || [])
   console.log(res.data?.data)
   console.log("This data")
  } catch (error) {
    console.log(error.message)
  }
 }

 useEffect(()=>{
handleGetAllCustomer();
 },[])


  // 🗑️ Delete Technician
  const handleDelete = async(id) => {
    if(!window.confirm("Are you sure to delete this Customer And There All Requests")) return;
   try {
    const res= await axios.delete(`http://localhost:5000/api/admin/delete/customer/${id}` ,{withCredentials:true});
    if(res.data?.success){
      handleGetAllCustomer();
    }
   } catch (error) {
    console.log(error.message)
   }
  };

  // 👁️ View (demo)
  const handleView = (tech) => {
    alert(`Viewing: ${tech.fullName}`);
  };

  // ✏️ Edit (demo)
 return (
    <>
    <Header/>
    <AdminSidebar/>
    <div className="p-6 md:ml-64 mt-16 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Customers 👨‍🔧
        </h1>
        <p className="text-sm text-gray-500">
          Manage all Customers
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((tech) => (
              <tr key={tech._id} className="border-b hover:bg-gray-50">
                {/* NAME */}
                <td className="p-3 font-medium">{tech.username}</td>
                {/* CONTACT */}
                <td className="p-3">
                  <div>{tech.email}</div>
                </td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(tech._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CustomerPage;