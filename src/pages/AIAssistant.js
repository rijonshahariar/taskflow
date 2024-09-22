import React from 'react';
import Sidebar from '../components/AI/Sidebar/Sidebar'
import ContextProvider from '../context/Context';
import Main from '../components/AI/Main/Main'
import '../../src/index.css'
import DashNav from '../components/DashNav';
import { Helmet } from 'react-helmet-async';

const AIAssistant = () => {
  return (

    <div className="max-w-screen-xl	mx-auto font-inter">
      <ContextProvider>
      <Helmet>
        <title>TaskFlow</title>
      </Helmet>
      <DashNav  />
    <div className='assistant assis'>
    <Sidebar/>
    <Main/>
    </div>
    </ContextProvider>
    </div>
  )
}

export default AIAssistant;