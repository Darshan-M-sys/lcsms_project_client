import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CustomerDashboard from './pages/CustomerDashboard'
import RequestService from './pages/RequestService'
import MyServices from './pages/MyServices'
import CustomerRequestView from './pages/CustomerRequestView'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddTechnicians from './pages/AdminDashboardPages/AddTechnicians'
import TechniciansPage from './pages/AdminDashboardPages/TechniciansPage'
import RequestsPage from './pages/AdminDashboardPages/RequestsPage'
import RequestsPages from './pages/Techniciandashboard/RequestsPages'
import RequestViewPage from './pages/AdminDashboardPages/RequestViewPage'
import CustomerPage from './pages/AdminDashboardPages/CustomerPage'
import TechnicianDashboard from './pages/Techniciandashboard/TechnicianDashboard'
import TechnicianRequestViewPage from './pages/Techniciandashboard/TechnicianRequestViewPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import TechnicianProfile from './pages/Techniciandashboard/TechnicianProfile'


const App = () => {
  return (
    <><Routes>
<Route path='/' element={<Home />} />
<Route path='/login' element={<Login />} />
<Route path='/register' element={<Register />} />
<Route path='/admin/login' element={<AdminLogin />} />
{/* Add Technician Route */}
<Route path='/admin/technicians/add' element={<AddTechnicians />} />
<Route path='/admin/technicians' element={<TechniciansPage />} />
<Route path='/admin/dashboard' element={<AdminDashboard />} />
<Route path='/admin/requests/:id' element={<RequestViewPage />} />
<Route path='/admin/requests' element={<RequestsPage />} />
<Route path='/admin/customers' element={<CustomerPage />} />
{/* Customer Dashboard Route */}
<Route path='/customer/dashboard' element={<CustomerDashboard />} />
<Route path='/customer/profile' element={<Profile />} />
<Route path='/about' element={<About />} />
<Route path='/contact' element={<Contact />} />


<Route path='/customer/request/service' element={<RequestService />} />
<Route path='/customer/my/services' element={<MyServices />} />
<Route path='/customer/my/services/view/:id' element={<CustomerRequestView />} />

{/* Technician  Routes */}
<Route path='/technician/dashboard' element={<TechnicianDashboard />} />
<Route path='/technician/profile' element={<TechnicianProfile />} />
<Route path='/dashboard' element={<Dashboard />} />
<Route path='/technician/request/service' element={<RequestsPages />} />
<Route path='/technician/request/view/:id' element={<TechnicianRequestViewPage />} />
</Routes>
</>

  )
}

export default App