import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ChatMessageCard = ({ messages = [], setMessages,render,setRender }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderId: {
        _id: user?._id,
        role: user?.role,
        name: user?.name,
      },
    };

    // optimistic UI
    if (setMessages) {
      setMessages((prev) => [...prev, newMessage]);
    }

    setInput("");

    try {
      await axios.put(
        `http://localhost:5000/api/admin/add/message/${id}`,
        { text: input },
        { withCredentials: true }
     
      );
         setRender(!render)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-xl h-[450px] overflow-hidden">
      <h1 className="text-lg font-bold p-4">Chat Messages</h1>

      {/* CHAT AREA */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => {
          const role = msg?.senderId?.role;
          const isCustomer = role === "customer";
          const senderName = msg?.senderId?.username || "Unknown";

          return (
            <div
              key={index}
              className={`flex flex-col mb-3 ${
                isCustomer ? "items-start" : "items-end"
              }`}
            >
              {/* 👤 Sender Name */}
              <span className="text-xs text-gray-500 mb-1">
                {senderName}{`(${role})`}
              </span>

              <div
                className={`max-w-[70%] p-3 rounded-xl shadow text-sm ${
                  isCustomer
                    ? "bg-white text-gray-800 rounded-tl-none"
                    : "bg-blue-500 text-white rounded-tr-none"
                }`}
              >
                <p>{msg?.text || "No message"}</p>

                {/* 🕒 Time */}
                 {/* <div ref={chatEndRef} /> */}
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {msg?.time ||
                    new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </p>
              </div>
            </div>
          );
        })}

       
      </div>

      {/* INPUT */}
      <div className="flex items-center gap-2 p-3 bg-white border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatMessageCard;