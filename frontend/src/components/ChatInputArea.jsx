import React from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";

const ChatInputArea = ({message, setMessage, sendMessageHandler}) => {
  return (
    <div className='flex gap-2 items-center justify-between w-[800px] mb-5 mx-auto rounded-full absolute bottom-0 left-[38%] bg-white '>
        <div className='flex gap-3 items-center border border-black rounded-full py-3 px-4 w-full'>
            <div className='cursor-pointer'>
                <GrAttachment size={20}/>
            </div>
            <div className=' w-full'>
                <form>
                    <input
                        type='text'
                        placeholder='Type a message'
                        className='w-full outline-none'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </form>
            </div>
        </div>
        <div 
        onClick={sendMessageHandler}
        className='p-3 cursor-pointer rounded-full bg-[#fd4f50]'>
            <RiSendPlaneFill size={24} fill='white'/>
        </div>
    </div>
  )
}

export default ChatInputArea