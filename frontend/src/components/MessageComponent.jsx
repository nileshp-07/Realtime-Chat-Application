import React from 'react'
import { useSelector } from 'react-redux';
import moment from "moment"

const MessageComponent = ({message}) => {
    // console.log("message",message);
    const {sender, content, attachments=[] , createdAt} = message;
    const {user} = useSelector((state) => state.auth)

    const isSameSender = user._id === sender._id; 
    const timeAgo = moment(createdAt).fromNow();

   return (
    <div className={`flex ${isSameSender ? "justify-end" : "justify-start"}`}>
        <div className='w-fit px-2 py-1 bg-slate-400 rounded-md'>
            <p>{sender?.name}</p>
            <div>
                {
                    content ? (
                        <p>{content}</p>
                    ) : (
                        attachments.map((attachment, index) => (
                            <div key={index}>{attachment.url}</div>
                        ))
                    )
                }
            </div>
            <p>{timeAgo}</p>
        </div>
    </div>
  )
}

export default MessageComponent