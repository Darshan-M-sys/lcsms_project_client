import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const Invoice = ({ bill }) => {
  const invoiceRef = useRef();

  const downloadPDF = () => {
    const element = invoiceRef.current;

    const opt = {
      margin: 0.5,
      filename: `invoice_${bill?._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const itemsTotal =
    bill?.items?.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) || 0;

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      
      {/* 🧾 Invoice */}
      <div
        ref={invoiceRef}
        className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
      >
        {/* 🔝 Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">LCSMS</h1>
            <p className="text-sm text-gray-500">
              Laptop & Computer Service Management
            </p>
          </div>

          <div className="text-right text-sm">
            <p><b>Invoice ID:</b> {bill?._id}</p>
            <p>
              <b>Date:</b>{" "}
              {new Date(bill?.createdAt).toLocaleDateString()}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className={`font-semibold ${
                bill?.status === "paid" ? "text-green-600" : "text-red-500"
              }`}>
                {bill?.status}
              </span>
            </p>
          </div>
        </div>

        <hr className="mb-6" />

        {/* 👤 Customer Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          
          {/* Customer */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Bill To:
            </h3>
            <p className="text-sm">
              <b>Name:</b> {bill?.requestId?.fullName || "N/A"}
            </p>
            <p className="text-sm">
              <b>Email:</b> {bill?.requestId?.email || "N/A"}
            </p>
            <p className="text-sm">
              <b>Phone:</b> {bill?.requestId?.phone || "N/A"}
            </p>
            <p className="text-sm">
              <b>Address:</b>{" "}
              {bill?.requestId?.address || "N/A"},{" "}
              {bill?.requestId?.city || ""}
            </p>
          </div>

          {/* Service Info */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Service Details:
            </h3>
            <p className="text-sm">
              <b>Device:</b> {bill?.requestId?.deviceType || "N/A"}
            </p>
            <p className="text-sm">
              <b>Brand:</b> {bill?.requestId?.brand || "N/A"}
            </p>
            <p className="text-sm">
              <b>Model:</b> {bill?.requestId?.model || "N/A"}
            </p>
          </div>
        </div>

        {/* 🧩 Items Table */}
        <table className="w-full border mb-6 text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>

          <tbody>
            {bill?.items?.length > 0 ? (
              bill.items.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border text-center">
                    {item.quantity}
                  </td>
                  <td className="p-2 border text-center">
                    ₹{item.price}
                  </td>
                  <td className="p-2 border text-center">
                    ₹{item.quantity * item.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-3 text-gray-500"
                >
                  No items added
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 💰 Summary */}
        <div className="flex justify-end">
          <div className="w-[250px] text-sm">
            <div className="flex justify-between">
              <span>Service Charge:</span>
              <span>₹{bill?.serviceCharge || 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Items Total:</span>
              <span>₹{itemsTotal}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{bill?.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Thank you for choosing our service 🙏
        </p>
      </div>

      {/* 📥 Download Button */}
      <div className="text-center mt-5">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;