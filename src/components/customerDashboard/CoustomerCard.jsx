import React from "react";

const CustomerCard = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">

      {/* HEADER */}
      <h1 className=" text-2xl font-bold ">Customer Details</h1>
      <hr className="my-4 border-gray-300" />
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {customer.fullName}
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
          Customer
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">

        <p><span className="font-medium">Email:</span> {customer.email}</p>
        <p><span className="font-medium">Phone:</span> {customer.phone}</p>

        <p><span className="font-medium">City:</span> {customer.city}</p>
        <p><span className="font-medium">State:</span> {customer.state}</p>

        <p><span className="font-medium">Pincode:</span> {customer.pincode}</p>
        <p><span className="font-medium">Address:</span> {customer.address}</p>

      </div>

      {/* FOOTER */}
      <div className="mt-4 text-xs text-gray-400">
        Customer ID: {customer._id}
      </div>
    </div>
  );
};

export default CustomerCard;