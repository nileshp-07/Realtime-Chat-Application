import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { server_url } from '../constants/envConfig';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FileMenuDialog from '../components/FileMenuDialog';


const Chats = () => {
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.auth);
  const {id : chatId} = useParams();
  const [isFriendTab, setIsFriendTab] = useState(true);
  const [friendsChats, setFriendChats] = useState([]);
  const [groupsChats, setGroupsChats] = useState([]);
  const [loading , setLoading] = useState(false);
  const {newMessageAlert} = useSelector((state) => state.chat);
  const hasMessageAlert = newMessageAlert.find((item) => item.chatId === chatId);


  // console.log("has message alert : ", hasMessageAlert);

  const fetchAllChatsHandler = async () => {
     setLoading(true);

     try{
        const res = await axios.get(`${server_url}/chat/all-chats`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
        console.log("all chats",res);
        const chats = res?.data?.allChats;

        const friends = chats.filter(chat => !chat.isGroup)
        const groups = chats.filter(chat => chat.isGroup)

        setFriendChats(friends);
        setGroupsChats(groups);
     }

     catch(err)
     {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!!");
     }
  } 

  const getOtherMember = (friend) => {
    return friend?.members?.find((member) => member._id !== user._id);
  }

  useEffect(() => {
    fetchAllChatsHandler()
  }, [])

  return (
    <div className='max-w-[400px] min-w-[400px] max-h-screen bg-[#EBF4FB] px-3 py-8'>
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


       <div className='flex flex-col max-h-screen overflow-y-scroll'>
        {
            isFriendTab && (
              friendsChats.map((chat) => (
                <Link to={`/chat/${chat._id}`} key={chat._id}>
                    <div className={`flex gap-4  py-5 px-3 rounded-md hover:bg-[#E1EEF7]`}>
                        <div className='h-[50px] w-[50px]'>
                          <img src={getOtherMember(chat)?.avatar?.url}
                            className='min-h-[50px] min-w-[50px] rounded-full'
                          />
                        </div>
                        <div className='w-full' >
                          <div className='flex justify-between w-full'>
                            <h2 className='font-medium font-sans'>{getOtherMember(chat)?.name}</h2>
                            <p className='text-sm'>yesterday</p>
                          </div>
                          <div className='flex justify-between pr-3'>
                            <p>{chat?.lastMessage?.content}</p>
                            <MdOutlineDoneAll/>
                          </div>
                          <div>
                          {
                             hasMessageAlert?.count > 0 && `${hasMessageAlert?.count} new messages`
                          }
                        </div>
                        </div>
                    </div>
                </Link>
              ))
            )
        }
        {
            !isFriendTab && (
              groupsChats.map((chat) => (
                 <Link to={`/chat/${chat._id}`} key={chat._id}>
                    <div
                          className={`flex gap-5  py-5 px-3 rounded-md hover:bg-[#E1EEF7]`}>
                        <div>
                          <img src='https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png?20181011102003'
                            className='h-[50px] w-[50px]'
                          />
                        </div>
                        <div>
                          <h2 className='font-medium font-sans'>{chat?.name}</h2>
                          <p>hii</p>
                        </div>
                        <div>
                          {
                             hasMessageAlert?.count > 0 && `${hasMessageAlert?.count} new messages`
                          }
                        </div>
                    </div>
                 </Link>
              ))
            )
        }
       </div>


       
       
    </div>
  )
}

export default Chats