import React from 'react'
import Features from "../components/home/Features"
import Roadmap from '../components/home/Roadmap'
import Testimonials from '../components/home/Testimonials'
import { Element } from 'react-scroll'
import { Helmet } from 'react-helmet-async'
import Banner from '../components/home/Banner'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Budget Buddy</title>
        <link rel="canonical" href="https://www.budgetbuddy.com/" />
      </Helmet>
      <Banner/>
      <Element name="features" ><Features /></Element>
      <Element name="how-it-works"><Roadmap /></Element>
      <Testimonials />
    </div>
  )
}

export default Home