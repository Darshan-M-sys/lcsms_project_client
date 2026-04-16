import React from "react";
import Header from "../components/home/Header";

const technicians = [
  {
    id: 1,
    name: "Rahul Kumar",
    skill: "Laptop Repair Specialist",
    phone: "+91 9876543210",
    email: "rahul@lcsms.com",
  },
  {
    id: 2,
    name: "Anjali Sharma",
    skill: "Hardware & Motherboard Expert",
    phone: "+91 9123456780",
    email: "anjali@lcsms.com",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    skill: "Software & OS Installation",
    phone: "+91 9988776655",
    email: "arjun@lcsms.com",
  },
];

const Contact = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen mt-16 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white px-6 py-12">

        {/* 🔷 Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Contact Us 📞</h1>
          <p className="text-gray-200">
            Get in touch with our expert technicians for your service needs
          </p>
        </div>

        {/* 🔷 Contact Form */}
        <div className="max-w-4xl mx-auto bg-white text-gray-800 p-8 rounded-2xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>

          <form className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border p-2 rounded-lg md:col-span-2"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="border p-2 rounded-lg md:col-span-2"
            ></textarea>

            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 md:col-span-2">
              Send Message
            </button>
          </form>
        </div>

        {/* 🔷 Technician Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Technicians 👨‍🔧
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg text-center"
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                  {tech.name.charAt(0)}
                </div>

                <h3 className="text-lg font-semibold">{tech.name}</h3>
                <p className="text-sm text-gray-500">{tech.skill}</p>

                <div className="mt-3 text-sm text-gray-600">
                  <p>📞 {tech.phone}</p>
                  <p>📧 {tech.email}</p>
                </div>

                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Contact
                </button>
              </div>
            ))}

          </div>
        </div>

 
      </div>
    </>
  );
};

export default Contact;