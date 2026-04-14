import React, { useState } from "react";
import axios from "axios";
import FormField from "../components/FormField";
import { useParams } from "react-router-dom";

const CreateBillPopup = ({ isOpen, setIsOpen,render,setRender}) => {
  const [serviceCharge, setServiceCharge] = useState(0);
   const {id}=useParams();
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  // ➕ Add item
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  // ❌ Remove item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // ✏️ Handle change
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "name" ? value : Number(value);
    setItems(updated);
  };

  // 💰 Calculate total
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const total = itemsTotal + serviceCharge;

  // 🚀 Submit
  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/create/bill/${id}` ,
        {
          serviceCharge,
          items,
        },
        { withCredentials: true }
      );
     setIsOpen(false)
     setRender(!render)
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] max-h-[85vh] overflow-y-auto rounded-xl p-5 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create Bill</h2>
          <button onClick={()=>setIsOpen(false)}>❌</button>
        </div>

        {/* 🔧 Service Charge */}
        <div className="mb-4">
          <FormField
            label="Service Charge"
            type="number"
            value={serviceCharge}
            onChange={(e) => setServiceCharge(Number(e.target.value))}
          />
        </div>

        {/* 🧩 Items Section */}
        <h3 className="text-md font-semibold mb-2">Parts / Items</h3>

        {items.map((item, index) => (
          <div key={index} className="border p-3 rounded-lg mb-3">
            
            <FormField
              label="Item Name"
              value={item.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
            />

            <div className="flex gap-2 mt-2">
              <FormField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />

              <FormField
                label="Price"
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleChange(index, "price", e.target.value)
                }
              />
            </div>

            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 text-xs mt-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* ➕ Add Item */}
        <button
          onClick={addItem}
          className="bg-gray-200 px-3 py-1 rounded mb-3"
        >
          + Add Item
        </button>

        {/* 💰 Total */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <p>Service: ₹{serviceCharge}</p>
          <p>Items: ₹{itemsTotal}</p>
          <h3 className="font-bold text-lg">Total: ₹{total}</h3>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={()=>setIsOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBillPopup;