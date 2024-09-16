import React from 'react'
import { Helmet } from 'react-helmet-async'
import DashNav from '../components/DashNav'
const Projects = () => {
  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
      <Helmet>
        <title>TaskFlow</title>
      </Helmet>
      <DashNav/>
      
    </div>
  )
}

export default Projects