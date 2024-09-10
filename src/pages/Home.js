import React from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from "../components/Nav/index.js"
import Hero from '../components/Hero/index.js'
const Home = () => {
  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
      <Helmet>
        <title>TaskFlow</title>
      </Helmet>
      <Nav/>
      <Hero/>

      <div className="flex items-center w-full p-6 z-50">
      <div className="hidden md:flex items-center gap-x-2">
        <img
          alt="Logo"
          loading="lazy"
          width="20"
          height="20"
          decoding="async"
          className="dark:hidden"
          src="/logo555.png"
          style={{ color: 'transparent' }}
        />
        
        <p className="font-bold ml-2 mr-4">TaskFlow</p>
      </div>

      <div className="hidden md:flex md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
          Privacy Policy
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
          Terms & Conditions
        </button>
      </div>
    </div>
    </div>
  )
}

export default Home