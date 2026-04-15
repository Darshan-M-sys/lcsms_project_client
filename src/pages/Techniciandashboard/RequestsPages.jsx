import React ,{useEffect,useState,useMemo} from 'react'
import Header from '../../components/home/Header'
import AdminSidebar from '../../components/AdminDashboard/AdminSidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestsPages = () => {
   const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/all/requests",
          { withCredentials: true }
        );
        setServices(res.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchServices();
    }, []);
  
    // 🔥 FILTERED DATA
   const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        if (filter === "All") return true;
        return (s.status || "").toLowerCase() === filter.toLowerCase();
      })
      .filter((s) =>
        (s.issueType || "").toLowerCase().includes(search.toLowerCase())
      );
  }, [services, search, filter]);
  
    // 🎨 STATUS COLORS
    const getStatusColor = (status) => {
      switch (status) {
        case "Pending":
          return "bg-yellow-100 text-yellow-700";
        case "Assigned":
          return "bg-blue-100 text-blue-700";
        case "In Progress":
          return "bg-purple-100 text-purple-700";
        case "Completed":
          return "bg-green-100 text-green-700";
        case "Cancelled":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };
  
    // 📊 STATS
    const stats = {
      total: services.length,
      pending: services.filter((s) => s.status === "Pending").length,
      progress: services.filter((s) => s.status === "In Progress").length,
      completed: services.filter((s) => s.status === "Completed").length,
    };
  return (

    <>
    <Header/>
    <AdminSidebar/>
  
<div className="md:ml-[250px] mt-20 p-6 bg-gray-50 min-h-screen">

        {/* 📊 STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total</p>
            <h2 className="text-xl font-bold">{stats.total}</h2>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl shadow">
            <p className="text-sm text-yellow-600">Pending</p>
            <h2 className="text-xl font-bold text-yellow-700">{stats.pending}</h2>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl shadow">
            <p className="text-sm text-purple-600">In Progress</p>
            <h2 className="text-xl font-bold text-purple-700">{stats.progress}</h2>
          </div>

          <div className="bg-green-50 p-4 rounded-xl shadow">
            <p className="text-sm text-green-600">Completed</p>
            <h2 className="text-xl font-bold text-green-700">{stats.completed}</h2>
          </div>
        </div>

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg border bg-white"
          />

          <div className="flex gap-2 flex-wrap">
            {["All", "Pending", "Assigned", "In Progress", "Completed"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    filter === f ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>
        </div>

        {/* 🧾 SERVICE LIST */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredServices.length === 0 ? (
          <p className="text-gray-500">No service requests found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                onClick={() => navigate(`/admin/requests/${service._id}`)}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 cursor-pointer border"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">
                    {service.issueType || "Service Request"} 
                  </h2>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {service.status}
                  </span>
                </div>

                {/* DEVICE */}
                <p className="text-gray-500 text-sm mt-1">
                  {service.device} • {service.brand} • {service.model}
                </p>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {service.description}
                </p>

                {/* FOOTER */}
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>⚡ {service.urgency}</span>
             
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  
        </>
  )
}

export default RequestsPages