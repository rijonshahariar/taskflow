import React from 'react'
import { Helmet } from 'react-helmet-async'
import AddTask from "./AddTask"
const Dash = () => {
  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
      <Helmet>
        <title>TaskFlow</title>
      </Helmet>
      <AddTask/>
    </div>
  )
}

export default Dash