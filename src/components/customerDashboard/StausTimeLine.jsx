import React from "react";

const StatusTimeLine = ({ timeLineStatus=[] }) => {
  // console.log("Timeline Status:", timeLineStatus); // Debug log to check the status prop
  const statusHistory = [
    {
      status: "Request Created",
      time: "10:00 AM",
      description: "Customer created service request",
    },
    {
      status: "Assigned to Technician",
      time: "10:30 AM",
      description: "Request assigned to Rahul Kumar",
    },
    {
      status: "Technician Accepted",
      time: "11:00 AM",
      description: "Technician accepted the job",
    },
    {
      status: "On the Way",
      time: "11:30 AM",
      description: "Technician is traveling to customer location",
    },
    {
      status: "Work Started",
      time: "12:00 PM",
      description: "Diagnosis and repair started",
    },
  ];

  return (
    <div className="relative w-full py-10">
  
      {/* CENTER LINE */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

      <div className="space-y-12">
          {timeLineStatus.map((item, index) => {
            const isLeft = index % 2 === 0;
          
              return (
            <div key={index} className="relative flex items-center">

              {/* 🔵 CENTER DOT (aligned per index) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>
              </div>

              {/* LEFT SIDE CARD */}
              <div className={`w-1/2 flex ${isLeft ? "justify-end pr-8" : ""}`}>
                {isLeft && (
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 w-80">
                    <h3 className="font-semibold text-gray-800">
                      {item.title || item.status}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.note || "No description available" }
                    </p>
                    <p className="text-xs text-gray-400 mt-2">⏱ {new Date(item.changedAt).toLocaleTimeString()}</p>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE CARD */}
              <div className={`w-1/2 flex ${!isLeft ? "justify-start pl-8" : ""}`}>
                {!isLeft && (
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 w-80">
                    <h3 className="font-semibold text-gray-800">
                      {item.title || item.status}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.note || "No description available"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">⏱ {item.time}</p>
                  </div>
                )}
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default StatusTimeLine;