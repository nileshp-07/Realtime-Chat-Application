import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";

const ChatHeader = () => {
  return (
        <div className='w-full h-[90px] bg-[#E1EEF7] flex items-center justify-between px-4'>
           <div className='flex gap-5 items-center'>
              <div>
                 <div className='w-[65px] h-[65px] rounded-full bg-white'></div>
              </div>

              <div>
                <h2 className='font-medium font-sans'>Nilesh Patidar</h2>
                <p>last seen today</p>
              </div>
           </div>

           <div className='cursor-pointer'>
              <HiOutlineDotsVertical size={24}/>
           </div>
        </div>
  )
}

export default ChatHeader