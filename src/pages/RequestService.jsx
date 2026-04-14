import React from 'react'
import Header from '../components/home/Header'
import RequestForm from '../components/RequestForm'
import Sidebar from '../components/customerDashboard/Sidebar'

const RequestService = () => {

  return (
    <>
      <Header />
      <Sidebar/>
      <div className="mt-20  md:ml-[250px] ">
<RequestForm/>
      </div>
    </>

  
  )
}

export default RequestService