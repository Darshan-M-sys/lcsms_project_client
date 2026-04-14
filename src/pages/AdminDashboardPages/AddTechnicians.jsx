import React, { useEffect, useState } from "react";
import FormField from "../../components/FormField";
import Header from "../../components/home/Header";
import AdminSidebar from "../../components/AdminDashboard/AdminSidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";


const AddTechnicians = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    skills: "",
    password: "",
  });
  const {state}=useLocation();

   const [updateMessage,setUpdateMessage]=useState("")

  const handleUpdateTech=async(e)=>{
    e.preventDefault();
    try {
     const res = await axios.put(`http://localhost:5000/api/admin/update/technicians/${state}`,formData,{withCredentials:true});
    setUpdateMessage(res.data?.message || "")
    } catch (error) {
      console.log(error)
    }
  }


  const handleGetTechnician=async()=>{
    try {
      
    const res= await axios.get(`http://localhost:5000/api/admin/single/technicians/${state}`,{withCredentials:true});
   setFormData((prev)=>({...prev,...res.data?.data,
    fullname:res.data?.data?.userId?.username,email:res.data?.data?.userId?.email}))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(state){
handleGetTechnician();
    }
  },[state])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [loading,setLoading]=useState(false)
 const [registerError,setRegisterError]=useState("");
   const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleSubmit = async(e) => {
    e.preventDefault();
 if (!passwordRegex.test(formData.password)) {
    return setRegisterError(
      "Password must be 8+ chars, include uppercase, lowercase, number & special character"
    );
  }
    setLoading(true)
     try {
      const res= await axios.post("http://localhost:5000/api/admin/add/technician",formData,{withCredentials:true});
      if(res.data?.success){
        alert("Registered") 
        setLoading(false);
      }

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      experience: "",
      skills: '',
      password: "",
    });
  
     } catch (error) {
      setRegisterError(error.response?.data?.message || "Register failed!")
     }
    };




  return (
    <>
    <Header/>
    <AdminSidebar/>
    <div className="p-6 mt-16 md:ml-64 bg-gray-100 min-h-screen">

      {/* CENTER CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Technician 👨‍🔧
          </h2>
          <p className="text-sm text-gray-500">
            Create a new technician profile for service management system
          </p>
        </div>
        {/* FORM */}
        <form onSubmit={state?handleUpdateTech:handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter full name"
            required={true}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required={true}
          />

          <FormField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required={true}
          />

          <FormField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
              required={true}
          />

          <FormField
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 3 Years"
              required={true}
          />

          <FormField
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. Laptop Repair, Hardware"
              required={true}
          />
   {!state && (
          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            required={true}
          />)}
          {registerError &&(
 <p className="text-red-500 text-center">{registerError}</p>
          )}
{state  && updateMessage && (
  <p className="text-green-400 text-center"> {updateMessage}</p>
)}
          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
        {!state?  (loading?"Adding Technician":"Add Technician") :  (loading?"Updating Technician":"Update Technician")}
          </button>

        </form>
      </div>
    </div>
    </>
  );
};

export default AddTechnicians;