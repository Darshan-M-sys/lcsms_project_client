import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard/AdminSidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TechniciansPage = () => {
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
  const [technicians,setTechnicians]=useState([]);
 const handleGetAllTechnicians=async()=>{
  try {
   const res= await axios.get('http://localhost:5000/api/admin/all/technicians',{withCredentials:true});
   setTechnicians(res.data?.data || [])

  } catch (error) {
    console.log(error.message)
  }
 }

 useEffect(()=>{
handleGetAllTechnicians();
 },[])

  // 🗑️ Delete Technician
  const handleDelete = async(id) => {
   try {
    const res= await axios.delete(`http://localhost:5000/api/admin/delete/technicians/${id}` ,{withCredentials:true});
    if(res.data?.success){
      handleGetAllTechnicians();
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
          Technicians 👨‍🔧
        </h1>
        <p className="text-sm text-gray-500">
          Manage all service technicians
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Skills</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((tech) => (
              <tr key={tech._id} className="border-b hover:bg-gray-50">
                {/* NAME */}
                <td className="p-3 font-medium">{tech.userId?.username}</td>
                {/* CONTACT */}
                <td className="p-3">
                  <div>{tech.userId?.email}</div>
                  <div className="text-xs text-gray-500">{tech.phone}</div>
                </td>

                {/* CITY */}
                <td className="p-3">{tech.city}</td>

                {/* EXPERIENCE */}
                <td className="p-3">{tech.experience}</td>

                {/* SKILLS */}
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {tech.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => handleView(tech)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      View
                    </button>

                    <button
                      
                      className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                    >
                    <Link to="/admin/technicians/add" state={tech._id}>  Edit
                    </Link>
                    </button>

                    <button
                      onClick={() => handleDelete(tech.userId._id)}
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

export default TechniciansPage;