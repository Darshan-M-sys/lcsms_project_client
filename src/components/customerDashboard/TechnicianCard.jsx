import React from "react";

const TechnicianCard = ({technician}) => {
  // 🔥 Static Technician Data
 if(!technician) return;
  return (

    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
<h1 className="text-2xl font-bold">Technician Details</h1>
      <hr className="my-4 border-gray-300" />
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {technician?.userId?.username}
        </h2>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
"Available" === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
         Available
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">

        <p><span className="font-medium">Email:</span> {technician?.userId?.email}</p>
        <p><span className="font-medium">Phone:</span> {technician.phone}</p>

        <p><span className="font-medium">City:</span> {technician.city}</p>
        <p><span className="font-medium">Experience:</span> {technician.experience}</p>

        {/* <p><span className="font-medium">Rating:</span> ⭐ {technician.rating}</p> */}

      </div>

      {/* SKILLS */}
      <div className="mt-4">
        <p className="font-medium text-sm text-gray-800 mb-1">Skills:</p>
        <div className="flex flex-wrap gap-2">
          {technician.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-4 text-xs text-gray-400">
        Technician Dashboard Card
      </div>
    </div>
  );
};

export default TechnicianCard;