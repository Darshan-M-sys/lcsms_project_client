import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    deviceType: "",
    brand: "",
    model: "",
    serialNumber: "",
    os: "",
    ram: "",
    processor: "",
    storage: "",
    category: "",
    issueType: "",
    urgency: "Normal",
    description: "",
    specificIssue: "",
    images: [],
  });
  const [preview, setPreview] = useState([]);
  const nav=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
    setFormData({ ...formData, images: files });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const requestData = new FormData();

    // append normal fields
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        requestData.append(key, formData[key]);
      }
    });

    // append images properly
    formData.images.forEach((img) => {
      requestData.append("images", img);
    });
  
    const res = await axios.post(
      "http://localhost:5000/api/services/request/create",
      requestData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
   
      nav("/customer/my/services")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        deviceType: "",
        brand: "",
        model: "",
        serialNumber: "",
        os: "",
        ram: "",
        processor: "",
        storage: "",
        category: "",
        issueType: "",
        urgency: "Normal",
        description: "",
        specificIssue: "",
        images: [],
      });

      setPreview([]);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Service Request Form 🔧</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 👤 Customer Info */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">Customer Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input  required value={formData.fullName}  name="fullName" placeholder="e.g. Darshan Kumar" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Email</label>
              <input  required value={formData.email} name="email" placeholder="e.g. darshan@gmail.com" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Phone</label>
              <input  required value={formData.phone} name="phone" placeholder="e.g. 9876543210" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Address</label>
              <input  required value={formData.address} name="address" placeholder="e.g. 123 Main Street" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">City</label>
              <input  required value={formData.city} name="city" placeholder="e.g. Bangalore" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">State</label>
              <input  required value={formData.state} name="state" placeholder="e.g. Karnataka" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Pincode</label>
              <input  required value={formData.pincode} name="pincode" placeholder="e.g. 560001" className="input" onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* 💻 Device Info */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">Device Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Device Type</label>
              <input  required value={formData.deviceType} name="deviceType" placeholder="e.g. Laptop / Desktop" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Brand</label>
              <input  required value={formData.brand} name="brand" placeholder="e.g. Dell, HP, Lenovo" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Model</label>
              <input  required value={formData.model} name="model" placeholder="e.g. Inspiron 15" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Serial Number</label>
              <input  required value={formData.serialNumber} name="serialNumber" placeholder="e.g. SN123456789" className="input" onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* ⚙️ Hardware Specs */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">Hardware Specs</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Operating System</label>
              <input  required value={formData.os} name="os" placeholder="e.g. Windows 11 / Ubuntu" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">RAM</label>
              <input  required value={formData.ram} name="ram" placeholder="e.g. 8GB / 16GB" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Processor</label>
              <input  required value={formData.processor} name="processor" placeholder="e.g. Intel i5 / Ryzen 5" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Storage</label>
              <input  required value={formData.storage} name="storage" placeholder="e.g. 512GB SSD / 1TB HDD" className="input" onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* ⚠️ Issue Info */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">Issue Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Issue Category</label>
              <select  required  value={formData.category}   name="category" className="input" onChange={handleChange}>
                <option>Select Category</option>
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
              </select>
            </div>

            <div>
              <label className="label">Specific Issue</label>
              <input  required value={formData.issueType} name="issueType" placeholder="e.g. Screen not working" className="input" onChange={handleChange}/>
            </div>

            <div>
              <label className="label">Urgency</label>
              <select   required value={formData.urgency}   name="urgency" className="input" onChange={handleChange}>
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Detailed Description</label>
            <textarea
              value={formData.description}
              name="description"
              placeholder="Explain your issue clearly (e.g. laptop overheating after 10 minutes)"
              className="input h-24"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 🖼️ Images */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">Attach Images</h3>

          <input type="file" multiple onChange={handleImages} />

          <div className="flex gap-2 mt-3">
            {preview.map((img, i) => (
              <img key={i} src={img} className="w-16 h-16 rounded object-cover"/>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          Submit Request 🚀
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          outline: none;
        }
        .input:focus {
          border-color: #2563eb;
        }
        .label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default RequestForm;