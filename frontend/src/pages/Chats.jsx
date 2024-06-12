import React, { useState } from 'react'
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";


const Chats = () => {
  const [isFriendTab, setIsFriendTab] = useState(true);
  const [friendsChats, setFriendChats] = useState([]);
  const [groupsChats, setGroupsChats] = useState([]);
  return (
    <div className='w-[500px] max-h-screen bg-[#EBF4FB] px-3 py-8'>
       <div className='flex gap-20 justify-center mb-5'>

          <div className='flex flex-col cursor-pointer font-medium'
            onClick={() => setIsFriendTab(true)}>
             <p>Friends</p>
             <div className={`h-[4px] w-full bg-[#fd4f50] rounded-full  ${isFriendTab ? "visible" : "hidden"}`}></div>
          </div>

          <div className='flex flex-col cursor-pointer font-medium'
            onClick={() => setIsFriendTab(false)}>
             <p>Groups</p>
             <div className={`h-[4px] w-full bg-[#fd4f50] rounded-full ${!isFriendTab ? "visible" : "hidden"}`}></div>
          </div>
       </div>

       <div className='flex flex-col h-full overflow-y-scroll'>
        {
            isFriendTab && (
              Array.from({ length: 10 }).map((chat, index) => (
                <div key={index} 
                      className={`flex gap-4  py-5 px-3 rounded-md hover:bg-[#E1EEF7]`}>
                    <div className='h-[50px] w-[50px]'>
                      <img src='https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png?20181011102003'
                        className='min-h-[50px] min-w-[50px]'
                      />
                    </div>
                    <div className='w-full' >
                      <div className='flex justify-between w-full'>
                        <h2 className='font-medium font-sans'>Nilesh Patidar</h2>
                        <p className='text-sm'>yesterday</p>
                      </div>
                      <div className='flex justify-between pr-3'>
                        <p>hii</p>
                        <MdOutlineDoneAll/>
                      </div>
                    </div>
                </div>
              ))
            )
        }
        {
            !isFriendTab && (
              Array.from({ length: 10 }).map((chat, index) => (
                <div key={index} 
                      className={`flex gap-5  py-5 px-3 rounded-md hover:bg-[#E1EEF7]`}>
                    <div>
                      <img src='https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png?20181011102003'
                        className='h-[50px] w-[50px]'
                      />
                    </div>
                    <div>
                      <h2 className='font-medium font-sans'>Patidar Group</h2>
                      <p>hii</p>
                    </div>
                </div>
              ))
            )
        }
       </div>

       
       
    </div>
  )
}

export default Chats