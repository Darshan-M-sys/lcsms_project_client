import React from "react";
import { useNavigate } from "react-router-dom";

// const services = [
//   {
//     id: 1,
//     title: "Laptop Screen Repair",
//     date: "12 Apr 2026",
//     status: "In Progress",
//   },
//   {
//     id: 2,
//     title: "Keyboard Replacement",
//     date: "10 Apr 2026",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     title: "Battery Issue",
//     date: "8 Apr 2026",
//     status: "Pending",
//   },
// ];


const RequestsList = ({services=[]}) => {
  console.log(services)
  const nav=useNavigate()
  const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "In Progress":
      return "bg-yellow-100 text-yellow-600";
    case "Pending":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      
      {/* 🔷 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Services</h2>
        {/* <button className="text-blue-600 text-sm hover:underline">
          View All
        </button> */}
      </div>

      {/* 🔷 List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div onClick={()=>nav(`/admin/requests/${service._id}`)}
            key={service.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{service.issueType}</p>
              <p className="text-sm text-gray-500">
                Requested on: {new Date(service.createdAt).toLocaleString("en-IN",{
                  dateStyle:"medium"
                })}
              </p>
            </div>

            {/* 🔷 Status */}
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                service.status
              )}`}
            >
              {service.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsList;