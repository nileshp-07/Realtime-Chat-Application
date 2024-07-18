import React from 'react'
import { useSelector } from 'react-redux';
import moment from "moment"

const MessageComponent = ({message, isGroup}) => {
    // console.log("message",message);
    const {sender, content, attachments=[] , createdAt} = message;
    const {user} = useSelector((state) => state.auth)

    const isSameSender = user._id === sender._id; 
    const timeAgo = moment(createdAt).fromNow();

   return (
    <div className={`flex ${isSameSender ? "justify-end" : "justify-start"}`}>
        <div className={`w-fit px-2 py-1 rounded-md ${isSameSender ? "bg-[#fd4f50] text-white" : "bg-[#E1EEF7]"}`}>
            {
                isGroup && !isSameSender && (
                    <p>{sender?.name}</p>
                )
            }
            <div>
                {
                    content ? (
                        <p className=''>{content}</p>
                    ) : (
                        attachments.map((attachment, index) => (
                            <div key={index}>{attachment.url}</div>
                        ))
                    )
                }
            </div>
            <div className='flex justify-end'>
              <p className='text-[10px]'>{timeAgo}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageComponent