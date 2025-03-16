import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
// import ChatInputArea from './ChatInputArea';
import { useParams } from 'react-router-dom';
import { server_url } from "../constants/envConfig";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../sockets';
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useSocketEvents } from '../hooks/hooks';
import MessageComponent from './MessageComponent';
import FileMenuDialog from './FileMenuDialog';
import { GrAttachment } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { setIsFileMenuOpen } from '../redux/slices/tabSlice';
import { removeNewMessagesAlert } from '../redux/slices/chatSlice';

const Messages = () => {
  const socket = getSocket();
  const { id: chatId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const [oldMessages, setOldMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState("")
  const members = chatDetails?.members?.map((member) => member._id);
  const [iamTyping, setIamTyping] = useState(false);
  const [userTyping , setUserTyping] = useState(false);
  const typingTimeOut = useRef(null);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();



  const getChatDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server_url}/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChatDetails(res?.data?.chatDetails);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const getChatMessages = async (page) => {
    try {
      const res = await axios.get(`${server_url}/chat/messages/${chatId}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOldMessages((prevMessages) => [...res?.data?.messages, ...prevMessages]);
      setTotalPages(res?.data?.totalPages);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const changeMessageHandler = (e) => {
    setMessage(e.target.value)

    if(!iamTyping)
    {
      socket.emit(START_TYPING , {members, chatId});
      setIamTyping(true);
    }

    if(typingTimeOut.current)   clearTimeout(typingTimeOut.current);


    typingTimeOut.current = setTimeout(() => {
      console.log("timeout runned")
       socket.emit(STOP_TYPING, {members, chatId});
       setIamTyping(false);
    }, [2000]);

  }

  const handleFileMenuOpen = (e) => {
      dispatch(setIsFileMenuOpen(true))
      setFileMenuAnchor(e.currentTarget);
  }

  useEffect(() => {
    // reset the component state first 
    getChatMessages(page);
  }, [chatId, page, token]);

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId))
    setMessages("");
    setMessage("");
    setPage(1);
    setOldMessages("")


    getChatDetails();
  },[chatId])

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatId]);

  const handleScroll = () => {
    if (containerRef.current.scrollTop === 0 && page < totalPages) {
      console.log("Scrolled to top, loading more messages...");
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll, totalPages, page]);

  const newMessageListener = useCallback((data) => {
    if(data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data?.message]);
  }, [chatId]);

  const startTypingListener = useCallback((data) => {
    if(chatId !== data.chatId) return;

    setUserTyping(true);
  },[chatId])

  const stopTypingListener = useCallback((data) => {
     if(chatId !== data.chatId) return;

     setUserTyping(false);
  },[chatId])

  const alertListner = useCallback((data) => {
         if(data.chatId !== chatId) return;

         const messageForAlert = {
          content: data.message,
          chat: chatId,
          createdAt : new Date().toISOString()
         }

         setMessages((prev) => [...prev, messageForAlert])
    },
    [chatId]
  )

  const eventHandlers = {
    [NEW_MESSAGE]: newMessageListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT] : alertListner
  };

  useSocketEvents(socket, eventHandlers);


  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const allMessages = [...oldMessages, ...messages];

  return (
    <div className='w-full flex flex-col'>
      <ChatHeader userTyping={userTyping} chatDetails={chatDetails}/>
      <div ref={containerRef} className='overflow-y-scroll flex flex-col gap-10 mx-5 h-full pb-20'>
        {allMessages.map((message, index) => (
          <MessageComponent message={message} isGroup={chatDetails?.isGroup} key={index} />
        ))}
      </div>
      
      <div ref={bottomRef}/>
      <div className='flex gap-2 items-center justify-between w-[800px] mb-5 mx-auto rounded-full absolute bottom-0 left-[38%] bg-transparent '>
         <div className='flex gap-3 items-center border border-black rounded-full py-3 px-4 w-full bg-white'>
            <div 
            onClick={handleFileMenuOpen}
            className='cursor-pointer'>
                <GrAttachment size={20}/>
            </div>
            <div className=' w-full'>
                <form onSubmit={sendMessageHandler}>
                    <input
                        autoFocus
                        type='text'
                        placeholder='Type a message'
                        className='w-full outline-none'
                        value={message}
                        onChange={changeMessageHandler}
                    />
                </form>
            </div>
         </div>
        <button
        onClick={sendMessageHandler}
        className='p-3 cursor-pointer rounded-full bg-[#fd4f50]'>
            <RiSendPlaneFill size={24} fill='white'/>
        </button>
      </div>

      <FileMenuDialog archorElement={fileMenuAnchor} chatId={chatId}/>

    </div>
  );
};

export default Messages;

