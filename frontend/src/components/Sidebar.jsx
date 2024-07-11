import React, { useState } from 'react'
import { TbMessage } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Modal from '@mui/material/Modal';
import UserProfile from './UserProfile';
import SearchFriends from './SearchFriends';
import Notifications from './Notifications';
import AddGroup from './AddGroup';
import axios from "axios"
import { server_url } from '../constants/envConfig';
import {useDispatch, useSelector} from "react-redux"
import { setToken, setUser } from '../redux/slices/authSlice';
import toast from "react-hot-toast"


const Sidebar = () => {
    const [currentTab,setCurrentTab] = useState("messages");
    const {notificationsCount} = useSelector((state) => state.chat)
    const {token} = useSelector((state) => state.auth) 
    const {user} = useSelector((state) => state.auth) 
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleOpenModal = (tabName) => {
         setOpen(true);
         setCurrentTab(tabName)
    }

    const handleCloseModal = () => {
        setOpen(false);
        setCurrentTab("messages");
    }


    const logoutHandler = async () => {
        try{
            const {data} = await axios.get(`${server_url}/user/logout`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(setUser(null));
            dispatch(setToken(null))

            toast.success(data.message)            
        }
        catch(err)
        {
            toast.error(err.response.data.message || "Something went wrong");
        }
    }

    
  return (
    <>
        <div className='min-w-[90px] flex flex-col justify-between items-center h-screen bg-[#181F2F] pt-5'>
            <div>
                <div 
                    onClick={() => handleOpenModal("profile")}
                    className='h-[60px] w-[60px] rounded-full bg-white cursor-pointer'>
                        <img
                            src={user?.avatar?.url}
                            className='h-full w-full rounded-full'
                        />
                </div>
                <div className='text-white flex flex-col gap-8 items-center mt-20'>
                    <div onClick={() => setCurrentTab("messages")}
                      className={`${currentTab === "messages" && "text-[#fd4f50]"} cursor-pointer`}>
                        <TbMessage size={26}/>
                    </div>
                    <div 
                       onClick={() => handleOpenModal("searchFriend")}
                       className={`${currentTab === "searchFriend" && "text-[#fd4f50]"} cursor-pointer`}>
                        <FiUserPlus  size={24}/>
                    </div>
                    <div 
                      onClick={() => handleOpenModal("addGroup")}
                      className={`${currentTab === "addGroup" && "text-[#fd4f50]"} cursor-pointer`}>
                        <MdOutlineGroupAdd  size={24}/>
                    </div>
                    <div className='relative'>
                     <div className='absolute top-[-3px] bg-[#fd4f50] h-[15px] w-[15px] rounded-full flex items-center justify-center text-xs' >{notificationsCount}</div>
                     <div 
                      onClick={() => handleOpenModal("notifications")}
                      className={`${currentTab === "notifications" && "text-[#fd4f50]"} cursor-pointer`}>
                        <IoNotificationsOutline  size={24}/>
                    </div>
                    </div>
                </div>
            </div>
            <div 
            onClick={logoutHandler}
            className='text-white flex justify-center bg-[#1F2A3E] w-full p-5'>
                <FiLogOut size={24}/>
            </div>
        </div>
        <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 outline-none">
            {
                currentTab === "profile" && (
                    <UserProfile/>
                )
            }
            {
                currentTab === "searchFriend" && (
                    <SearchFriends/>
                )
            }
            {
                currentTab === "notifications" && (
                    <Notifications/>
                )
            }
            {
                currentTab == "addGroup"  && (
                    <AddGroup/>
                )
            }
        </div>
      </Modal>
    </>
  )
}

export default Sidebar