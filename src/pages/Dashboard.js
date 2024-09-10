import React from 'react'
import { Helmet } from 'react-helmet-async'
import AddTask from "./AddTask"
import DashNav from '../components/DashNav'
const Dash = () => {
  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
      <Helmet>
        <title>TaskFlow</title>
      </Helmet>
      <DashNav/>
      <AddTask/>
    </div>
  )
}

export default Dash