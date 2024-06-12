import React from 'react'
import Chats  from "../pages/Chats"
import Sidebar from '../components/Sidebar' 
import Messages from '../components/Messages'

const Home = () => {
  return (
    <div className='flex w-full'>
        <Sidebar/>
        <Chats/>
        <Messages/>
    </div>
  )
}

export default Home