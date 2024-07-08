import React, { useCallback, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader';
import ChatInputArea from './ChatInputArea';
import { useParams } from 'react-router-dom';
import {server_url} from "../constants/envConfig"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getSocket } from '../sockets';
import {NEW_MESSAGE} from "../constants/events"

const Messages = () => {
  const socket = getSocket()
  const [message, setMessage] = useState("");
  const {id: chatId } = useParams();
  const {token} = useSelector((state) => state.auth);
  const [chatDetails, setChatDetails] = useState("")

  const getChatDetails = async () => {
     try{
      const res = await axios.get(`${server_url}/chat/${chatId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChatDetails(res?.data?.chatDetails)
     }
     catch(err)
     {
       console.error(err);
       toast.error(err?.response?.data?.message || "Something went wrong");
     }
  }


  const sendMessageHandler = async () => {
    if (!message.trim()) return;

    // Emitting  the message to the server 
    const members = chatDetails?.members?.map((member) => member._id);
    console.log(members);
    socket.emit(NEW_MESSAGE, {chatId, members, message});
    setMessage("");
  }

  useEffect(() => {
      getChatDetails();
  }, [])


  const newMessageHander =  useCallback((data) => {
      console.log(data);
  }, [])

  useEffect(() => {
    socket.on(NEW_MESSAGE, newMessageHander);

    return () => socket.off(NEW_MESSAGE, newMessageHander);
  }, [socket])
  return (
    <div className='w-full flex flex-col justify-between'>
       <ChatHeader/>
       <div className='overflow-y-scroll mx-5'>
            
       </div>
       <ChatInputArea message={message} setMessage={setMessage} sendMessageHandler={sendMessageHandler}/>
    </div>
  )
}

export default Messages