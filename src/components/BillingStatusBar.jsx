import React, { useState } from "react";
import axios from "axios";

const BillingStatusBar = ({ bill, setBill,render,setRender }) => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `http://localhost:5000/api/admin/status/bill/${bill._id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // ✅ update UI
      if (setBill) {
        setBill(res.data.data);
      }
 setRender(!render)
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between mb-4">
      
      {/* Status */}
      <div>
        <p className="text-sm text-gray-500">Billing Status</p>
        <span
          className={`font-bold ${
            bill.status === "paid"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {bill.status.toUpperCase()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {bill.status !== "paid" && (
          <button
            onClick={() => updateStatus("paid")}
            disabled={loading}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
          >
            Mark as Paid
          </button>
        )}

        {bill.status !== "pending" && (
          <button
            onClick={() => updateStatus("pending")}
            disabled={loading}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
          >
            Mark as Pending
          </button>
        )}
      </div>
    </div>
  );
};

export default BillingStatusBar;