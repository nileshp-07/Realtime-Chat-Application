import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { server_url } from '../constants/envConfig';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileMenuDialog from '../components/FileMenuDialog';
import toast from 'react-hot-toast';
import SkeletonLoader from '../components/SkeletonLoader';
import { setToken, setUser } from '../redux/slices/authSlice';


const Chats = ({onlineUsers}) => {
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.auth);
  const {id : chatId} = useParams();
  const [isFriendTab, setIsFriendTab] = useState(true);
  const [friendsChats, setFriendChats] = useState([]);
  const [groupsChats, setGroupsChats] = useState([]);
  const [loading , setLoading] = useState(false);
  const {newMessageAlert} = useSelector((state) => state.chat);
  const navigate = useNavigate();


  const hasMessageAlert = (chatId) => {
    const messageAlert = newMessageAlert.find((item) => item.chatId === chatId);

    console.log("message Alert : ", messageAlert);
    return messageAlert;
  }
  

  const isOnline = (chat) => {
    const friend = getOtherMember(chat);
    console.log("Online Users : ", onlineUsers);
    return onlineUsers.includes(friend._id);
  }

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
      toast.error("Token not found, Please Login first!!");
      setToken(null);
      setUser(null);
     }

     setLoading(false);
  } 

  const getOtherMember = (friend) => {
    return friend?.members?.find((member) => member._id !== user._id);
  }

  useEffect(() => {
    fetchAllChatsHandler()
  }, [])


  if(loading)
  {
    return <SkeletonLoader/>
  }

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
              friendsChats.length === 0 ? (
                <div className='h-full w-full mt-20 flex items-center justify-center'>
                   <div className='w-3/4 text-center'>
                     You don't have any friends, add some friends to chat
                   </div>
                </div>
              ) : (
                friendsChats.map((chat) => (
                  <Link to={`/chat/${chat._id}`} key={chat._id}>
                      <div className={`flex gap-4  py-5 px-3 rounded-md hover:bg-[#E1EEF7]`}>
                          <div className='h-[50px] w-[50px]'>
                            <img src={getOtherMember(chat)?.avatar?.url}
                              className='min-h-[50px] min-w-[50px] rounded-full'
                            />
                            {
                              isOnline(chat) && (
                                <div className="h-[10px] w-[10px] bg-black rounedd-full"></div>
                              )
                            }
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
                              hasMessageAlert(chat._id)?.count > 0 && `${hasMessageAlert(chat._id)?.count} new messages`
                            }
                          </div>
                          </div>
                      </div>
                  </Link>
                ))
              )
             
            )
        }
        {
            !isFriendTab && ( 
              friendsChats.length === 0 ? (
                <div className='h-full w-full mt-20 flex items-center justify-center'>
                   <div className='w-3/4 text-center'>
                     You don't have any groups
                   </div>
                </div>
              ) : (
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
                              hasMessageAlert(chat._id)?.count > 0 && `${hasMessageAlert(chat._id)?.count} new messages`
                            }
                          </div>
                      </div>
                  </Link>
                ))
              )
            )
        }
       </div>


       
       
    </div>
  )
}

export default Chats