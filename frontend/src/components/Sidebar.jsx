import React, { useState } from 'react'
import { TbMessage } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Modal from '@mui/material/Modal';
import UserProfile from './modals/UserProfile';
import SearchFriends from './modals/SearchFriends';
import Notifications from './modals/Notifications';
import AddGroup from './modals/AddGroup';
import axios from "axios"
import { server_url } from '../constants/envConfig';
import {useDispatch, useSelector} from "react-redux"
import { setToken, setUser } from '../redux/slices/authSlice';
import toast from "react-hot-toast"
import {setCurrTabModal}  from "../redux/slices/tabSlice"
import Logout from './modals/Logout';
import { setNotificationsCount } from '../redux/slices/chatSlice';


const Sidebar = () => {
    const {currTabModal} = useSelector((state) => state.tab);
    const {notificationsCount} = useSelector((state) => state.chat)
    const {token} = useSelector((state) => state.auth) 
    const {user} = useSelector((state) => state.auth) 
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleOpenModal = (tabName) => {
         setOpen(true);
         dispatch(setCurrTabModal(tabName))
    }


    const handleCloseModal = () => {
        setOpen(false);
        dispatch(setCurrTabModal("Messages"));
    }

    
  return (
    <>
        <div className='min-w-[90px] flex flex-col justify-between items-center h-screen bg-[#181F2F] pt-5'>
            <div>
                <div 
                    onClick={() => handleOpenModal("Profile")}
                    className='h-[60px] w-[60px] rounded-full bg-white cursor-pointer'>
                        <img
                            src={user?.avatar?.url}
                            className='h-full w-full rounded-full'
                        />
                </div>
                <div className='text-white flex flex-col gap-8 items-center mt-20'>
                    <div
                      className={`${currTabModal === "Messages" && "text-[#fd4f50]"} cursor-pointer`}>
                        <TbMessage size={26}/>
                    </div>
                    <div 
                       onClick={() => handleOpenModal("SearchFriend")}
                       className={`${currTabModal === "SearchFriend" && "text-[#fd4f50]"} cursor-pointer`}>
                        <FiUserPlus  size={24}/>
                    </div>
                    <div 
                      onClick={() => handleOpenModal("AddGroup")}
                      className={`${currTabModal === "AddGroup" && "text-[#fd4f50]"} cursor-pointer`}>
                        <MdOutlineGroupAdd  size={24}/>
                    </div>
                    <div className='relative'
                     onClick={() => {
                        handleOpenModal("Notifications")
                        dispatch(setNotificationsCount(0))
                    }}>
                     
                    {
                       notificationsCount > 0 && (
                           <div className='absolute top-[-3px] bg-[#fd4f50] h-[15px] w-[15px] rounded-full flex items-center justify-center text-xs' >{notificationsCount}</div>
                       )
                    }
                    <div 
                      className={`${currTabModal === "Notifications" && "text-[#fd4f50]"} cursor-pointer`}>
                        <IoNotificationsOutline  size={24}/>
                    </div>
                    </div>
                </div>
            </div>
            {/* <div 
            // onClick={logoutHandler}
            className='text-white flex justify-center bg-[#1F2A3E] w-full p-5'>
                <FiLogOut size={24}/>
            </div> */}
            <div 
                onClick={() => handleOpenModal("Logout")}
                className={`${currTabModal === "Logout" && "text-[#fd4f50]"} cursor-pointer text-white flex justify-center bg-[#1F2A3E] w-full p-5`}>
                  <FiLogOut  size={24}/>
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
                currTabModal === "Profile" && (
                    <UserProfile/>
                )
            }
            {
                currTabModal === "SearchFriend" && (
                    <SearchFriends/>
                )
            }
            {
                currTabModal === "Notifications" && (
                    <Notifications/>
                )
            }
            {
                currTabModal === "AddGroup"  && (
                    <AddGroup/>
                )
            }
            {
                currTabModal === "Logout" && (
                    <Logout setOpen={setOpen}/>
                )
            }
        </div>
      </Modal>
    </>
  )
}

export default Sidebar