import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useParams } from 'react-router-dom';

const ChatHeader = ({userTyping}) => {
   const {id: chatId} = useParams()
  return (
        <div className='w-full h-[90px] bg-[#E1EEF7] flex items-center justify-between px-4'>
           <div className='flex gap-5 items-center'>
              <div>
                 <div className='w-[65px] h-[65px] rounded-full bg-white'></div>
              </div>

              <div>
                <h2 className='font-medium font-sans'>Nilesh Patidar</h2>
                {/* <p>last seen today</p>
                 */}

               <div>
                  {
                     userTyping ? "Typing..." : "last seen today"
                  }
               </div>
              </div>
           </div>

           <Link to={`/chat-info/${chatId}`}>
               <div className='cursor-pointer'>
                  <HiOutlineDotsVertical size={24}/>
               </div>
           </Link>
        </div>
  )
}

export default ChatHeader