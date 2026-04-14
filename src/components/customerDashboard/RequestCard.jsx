import React from "react";

const RequestCard = ({ request }) => {
  if (!request) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
 <h1 className="text-2xl font-bold">Request Details</h1>
      <hr className="my-4 border-gray-300" />
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {request.deviceType} - {request.brand}
        </h2>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            request.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {request.status}
        </span>
      </div>

      {/* REQUEST DETAILS ONLY */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">

        <p><span className="font-medium">Model:</span> {request.model}</p>
        <p><span className="font-medium">Category:</span> {request.category}</p>

        <p><span className="font-medium">Issue Type:</span> {request.issueType}</p>
        <p><span className="font-medium">Urgency:</span> {request.urgency}</p>

        <p><span className="font-medium">Processor:</span> {request.processor}</p>
        <p><span className="font-medium">RAM:</span> {request.ram}</p>

        <p><span className="font-medium">Storage:</span> {request.storage}</p>
        <p><span className="font-medium">OS:</span> {request.os}</p>

        <p><span className="font-medium">Serial No:</span> {request.serialNumber}</p>
        <p><span className="font-medium">Pincode:</span> {request.pincode}</p>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Description:</span>{" "}
          {request.description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-4 text-xs text-gray-400">
        Request ID: {request._id}
      </div>
    </div>
  );
};

export default RequestCard;