import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ChatHeader = ({userTyping, chatDetails}) => {
   const {id: chatId} = useParams()
   const {user} = useSelector((state) => state.auth)



   const getOtherMember = () => {
      return chatDetails?.members?.find((member) => member._id !== user._id);
   }

   const otherMember = getOtherMember();
  return (
        <div className='w-full h-[90px] bg-[#E1EEF7] flex items-center justify-between px-4'>
           <div className='flex gap-5 items-center'>
              <div>
                 <div className='w-[65px] h-[65px] rounded-full bg-white'>
                    <img
                     src={otherMember?.avatar?.url}
                     className='rounded-full'
                    />
                 </div>
              </div>

              <div>
                <h2 className='font-medium font-sans'>{otherMember?.name}</h2>
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