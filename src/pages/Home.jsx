import React from 'react'
import Hero from '../components/home/Hero'
import Header from '../components/home/Header'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import Stats from '../components/home/Stats'
import CallToAction from '../components/home/CallToAction'

const Home = () => {
  return (
    <>   
     <Header/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <Stats/>
    <CallToAction/>
    </>

  )
}

export default Home