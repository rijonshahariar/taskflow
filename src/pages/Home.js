import React from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from "../componants/Nav/index.js"
import Hero from '../componants/Hero/index.js'
const Home = () => {
  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
      <Helmet>
        <title>Taskflow</title>
      </Helmet>
      <Nav/>
      <Hero/>
    </div>
  )
}

export default Home