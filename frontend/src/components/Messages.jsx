// // import React, { useCallback, useEffect, useRef, useState } from 'react'
// // import ChatHeader from './ChatHeader';
// // import ChatInputArea from './ChatInputArea';
// // import { useParams } from 'react-router-dom';
// // import {server_url} from "../constants/envConfig"
// // import toast from 'react-hot-toast';
// // import axios from 'axios';
// // import { useSelector } from 'react-redux';
// // import { getSocket } from '../sockets';
// // import {NEW_MESSAGE} from "../constants/events"
// // import { useSocketEvents } from '../hooks/hooks';
// // import MessageComponent from './MessageComponent';
// // import {useInfiniteScrollTop} from "6pp"

// // const Messages = () => {
// //   const socket = getSocket()
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState([]);
// //   const {id: chatId } = useParams();
// //   const {token} = useSelector((state) => state.auth);
// //   const [chatDetails, setChatDetails] = useState("")
// //   const [loading , setLoading] = useState(false);
// //   const [page, setPage] = useState(1);
// //   const containerRef = useRef(null);
// //   const [oldMessage,  setOldMessage] = useState("");
// //   const [totalPages, setTotalPages]  = useState(1) 

// //   const getChatDetails = async () => {
// //      setLoading(true);
// //      try{
// //       const res = await axios.get(`${server_url}/chat/${chatId}`,{
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       setChatDetails(res?.data?.chatDetails)
// //      }
// //      catch(err)
// //      {
// //        console.error(err);
// //        toast.error(err?.response?.data?.message || "Something went wrong");
// //      }
// //      setLoading(false);
// //   }

// //   const sendMessageHandler = async (e) => {
// //     e.preventDefault();

// //     if (!message.trim()) return;

// //     // Emitting  the message to the server 
// //     const members = chatDetails?.members?.map((member) => member._id);
// //     console.log(members);
// //     socket.emit(NEW_MESSAGE, {chatId, members, message});
// //     setMessage("");
// //   }

// //   const getChatMessages = async (page) => {
// //      try{
// //          const res = await axios.get(`${server_url}/chat/messages/${chatId}?page=${page}`,{
// //            headers : {
// //             Authorization : `Bearer ${token}`
// //            }
// //         });

// //         setOldMessage(res?.data?.messages);
// //         setTotalPages(res?.data?.totalPages);
// //      }
// //      catch(err)
// //      {
// //       console.error(err);
// //       toast.error(err?.response?.data?.message || "Something went wrong");
// //      }
// //   }

// //   useEffect(() => {
// //       getChatDetails();
// //   }, [page])


// //   useEffect(() => {
// //     getChatMessages(page);
// //   }, [page])

// //   const handleScroll = () => {
// //     if (containerRef.current.scrollTop === 0 && page < totalPages) {
// //       console.log("Scrolled to top, loading more messages...");
// //       setPage((prevPage) => prevPage + 1);
// //     }
// //   };

// //   useEffect(() => {
// //     const container = containerRef.current;
// //     if (container) {
// //       container.addEventListener('scroll', handleScroll);
// //       return () => {
// //         container.removeEventListener('scroll', handleScroll);
// //       };
// //     }
// //   }, [handleScroll, totalPages, page]);

  
// //   // const {data:oldMessages1, setData: setOldMessages1} = useInfiniteScrollTop(
// //   //   containerRef,
// //   //   totalPages,
// //   //   page,
// //   //   setPage,
// //   //   oldMessage
// //   // )

// //   console.log(oldMessage, page)



// //   const newMessageHander =  useCallback((data) => {
// //       setMessages(prev => [...prev, data.message]);
// //   }, [])


// //   const eventHandlers = {
// //      [NEW_MESSAGE] :  newMessageHander,   //why we give the key into  [] because if use it simple NEW_MESSAGE it will use it as a property not a event we imported
// //   }

// //   useSocketEvents(socket, eventHandlers);  //a hook that listen to all the events


// //   const allMessages = [...oldMessage, ...messages];

// //   // console.log(oldMessages)
// //   // console.log(message)
// //   // console.log(allMessages);

// //   return (
// //     <div className='w-full flex flex-col '>
// //        <ChatHeader/>
// //        <div className='overflow-y-scroll flex flex-col gap-5 mx-5 h-full'>
// //           {
// //              allMessages.map((message) => (
// //                 <MessageComponent message={message} key={message._id}
// //                 />
// //              ))
// //           }
// //        </div>
// //        <ChatInputArea message={message} setMessage={setMessage} sendMessageHandler={sendMessageHandler}/>
// //     </div>
// //   )
// // }

// // export default Messages





// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import ChatHeader from './ChatHeader';
// import ChatInputArea from './ChatInputArea';
// import { useParams } from 'react-router-dom';
// import { server_url } from "../constants/envConfig";
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { getSocket } from '../sockets';
// import { NEW_MESSAGE } from "../constants/events";
// import { useSocketEvents } from '../hooks/hooks';
// import MessageComponent from './MessageComponent';

// const Messages = () => {
//   const socket = getSocket();
//   const { id: chatId } = useParams();
//   const { token } = useSelector((state) => state.auth);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [chatDetails, setChatDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const containerRef = useRef(null);
//   const [oldMessages, setOldMessages] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   const getChatDetails = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${server_url}/chat/${chatId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setChatDetails(res?.data?.chatDetails);
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//     setLoading(false);
//   };

//   const getChatMessages = async (page) => {
//     try {
//       const res = await axios.get(`${server_url}/chat/messages/${chatId}?page=${page}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOldMessages((prevMessages) => [...res?.data?.messages, ...prevMessages]);
//       setTotalPages(res?.data?.totalPages);
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getChatDetails();
//     getChatMessages(page);
//   }, [chatId, page, token]);

//   const handleScroll = () => {
//     if (containerRef.current.scrollTop === 0 && page < totalPages) {
//       console.log("Scrolled to top, loading more messages...");
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//       return () => {
//         container.removeEventListener('scroll', handleScroll);
//       };
//     }
//   }, [handleScroll, totalPages, page]);

//   const newMessageHandler = useCallback((data) => {
//     setMessages((prev) => [...prev, data.message]);
//   }, []);

//   const eventHandlers = {
//     [NEW_MESSAGE]: newMessageHandler,
//   };

//   useSocketEvents(socket, eventHandlers);

//   const sendMessageHandler = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     const members = chatDetails?.members?.map((member) => member._id);
//     socket.emit(NEW_MESSAGE, { chatId, members, message });
//     setMessage("");
//   };

//   const allMessages = [...oldMessages, ...messages];

//   return (
//         <div className='w-full flex flex-col '>
//           <ChatHeader/>
//           <div className='overflow-y-scroll flex flex-col gap-5 mx-5 h-full'>
//               {
//                 allMessages.map((message) => (
//                     <MessageComponent message={message} key={message._id}
//                     />
//                 ))
//               }
//           </div>
//           <ChatInputArea message={message} setMessage={setMessage} sendMessageHandler={sendMessageHandler}/>
//         </div>
//   );
// };

// export default Messages;




import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInputArea from './ChatInputArea';
import { useParams } from 'react-router-dom';
import { server_url } from "../constants/envConfig";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getSocket } from '../sockets';
import { NEW_MESSAGE } from "../constants/events";
import { useSocketEvents } from '../hooks/hooks';
import MessageComponent from './MessageComponent';

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

  useEffect(() => {
    getChatDetails();
    getChatMessages(page);
  }, [chatId, page, token]);

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

  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandlers = {
    [NEW_MESSAGE]: newMessageHandler,
  };

  useSocketEvents(socket, eventHandlers);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const members = chatDetails?.members?.map((member) => member._id);
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const allMessages = [...oldMessages, ...messages];

  // Debug: log the keys to check for duplicates
  // allMessages.forEach((msg, index) => console.log(`Message ${index}: ${msg._id}`));

  console.log(allMessages)

  return (
    <div className='w-full flex flex-col'>
      <ChatHeader />
      <div ref={containerRef} className='overflow-y-scroll flex flex-col gap-5 mx-5 h-full'>
        {allMessages.map((message, index) => (
          <MessageComponent message={message} key={index} />
        ))}
      </div>
      <ChatInputArea message={message} setMessage={setMessage} sendMessageHandler={sendMessageHandler} />
    </div>
  );
};

export default Messages;

