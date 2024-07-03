import React, { useEffect } from 'react'
import Chats  from "../pages/Chats"
import Sidebar from '../components/Sidebar' 
import Messages from '../components/Messages'
import { Outlet } from 'react-router-dom'
import {server_url} from "../constants/envConfig"

const Home = () => {

  useEffect(() => {
    
  }, [])
  return (
    <div className='flex w-full'>
        <Sidebar/>
        <Chats/>

        <Outlet/>
    </div>
  )
}

export default Home