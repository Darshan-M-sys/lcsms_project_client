import React, { useState, useRef, useEffect } from "react";

const ChatMessageCard = () => {
  // 🔥 Static initial messages
  const [messages, setMessages] = useState([
    {
      sender: "customer",
      message: "Hi, my laptop is overheating very quickly.",
      time: "10:00 AM",
    },
    {
      sender: "technician",
      message: "Okay, I will check the fan and thermal paste.",
      time: "10:05 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // ⬇️ Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ⬆️ Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "customer",
      message: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-xl h-[450px] overflow-hidden">

      {/* 💬 CHAT AREA */}
      <h1 className="text-lg font-bold p-4">Chat Messages</h1>
      <div className="flex-1 p-4 overflow-y-auto">

        {messages.map((msg, index) => {
          const isCustomer = msg.sender === "customer";

          return (
            <div
              key={index}
              className={`flex mb-3 ${
                isCustomer ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl shadow text-sm ${
                  isCustomer
                    ? "bg-white text-gray-800 rounded-tl-none"
                    : "bg-blue-500 text-white rounded-tr-none"
                }`}
              >
                <p>{msg.message}</p>

                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}

        {/* 👇 auto scroll anchor */}
        <div ref={chatEndRef}></div>
      </div>

      {/* ⌨️ INPUT AREA */}
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
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
        >
          Send
        </button>

      </div>
    </div>
  );
};

export default ChatMessageCard;