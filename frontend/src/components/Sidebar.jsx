import React from 'react'
import { TbMessage } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserProfile from './UserProfile';


const Sidebar = () => {
    const currentTab = "messages";
    const [open, setOpen] = React.useState(false);
  return (
    <>
        <div className='min-w-[90px] flex flex-col justify-between items-center h-screen bg-[#181F2F] pt-5'>
            <div>
                <div 
                onClick={() => setOpen(true)}
                className='h-[60px] w-[60px] rounded-full bg-white'>
                
                </div>
                <div className='text-white flex flex-col gap-8 items-center mt-20'>
                    <div className={`${currentTab === "messages" && "text-[#fd4f50]"}`}>
                        <TbMessage size={26}/>
                    </div>
                    <div className={`${currentTab === "addFriend" && "text-[#fd4f50]"}`}>
                        <FiUserPlus  size={24}/>
                    </div>
                    <div className={`${currentTab === "addGroup" && "text-[#fd4f50]"}`}>
                        <MdOutlineGroupAdd  size={24}/>
                    </div>
                    <div className={`${currentTab === "notifications" && "text-[#fd4f50]"}`}>
                        <IoNotificationsOutline  size={24}/>
                    </div>
                </div>
            </div>
            <div className='text-white flex justify-center bg-[#1F2A3E] w-full p-5'>
                <FiLogOut size={24}/>
            </div>
        </div>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 p-4 w-[400px] bg-white outline-none rounded-md shadow-custom">
            <UserProfile/>
        </div>
      </Modal>
    </>
  )
}

export default Sidebar