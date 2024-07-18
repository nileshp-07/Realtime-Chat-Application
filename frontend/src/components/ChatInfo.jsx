import React, { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import AddMembers from './AddMembers';
import axios from "axios"
import { useParams } from 'react-router-dom';
import {server_url} from "../constants/envConfig"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPencilFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { setIsNewGroup } from '../redux/slices/chatSlice';
import UnFriend from './modals/UnFriend';
import { setIsUsfriendOpen } from '../redux/slices/tabSlice';

const ChatInfo = () => {
    const [isGroup, setIsGroup] = useState(true);
    const {user} = useSelector((state) => state.auth)
    const {isUnfriendOpen} = useSelector((state) => state.tab);
    const {id : chatId} = useParams();
    const [open, setOpen] = useState(false);
    const [chatDetails , setChatDetail] = useState("");
    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth)
    const [isRenameGroup, setIsRenameGroup] = useState(false);
    const [newMembers, setNewMembers] = useState([]);
    const dispatch = useDispatch();

    const getChatDetails = async() => {
        setLoading(true);
        try{        
            const res = await axios.get(`${server_url}/chat/${chatId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            setIsGroup(res?.data?.chatDetails?.isGroup)

            console.log("CHAT DETAILS :  ",res);

            setChatDetail(res?.data?.chatDetails);
        }   
        catch(err)
        {
            console.error(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        setLoading(false);
    }


    const handleAddMember = async() => {
        if(newMembers.length === 0) return;

        setLoading(true);

        try{
            const res = await axios.put(`${server_url}/chat/add-members`, {chatId, members: newMembers}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success("Members add to group");
        }
        catch(err)
        {
            console.error(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        setLoading(false);
    }


    const handleRemoveMembers =  async(memberId) => {
        setLoading(true);

        try{
            const res = await axios.put(`${server_url}/chat/remove-member`, {chatId, memberId}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success("Member removed from group");
        }
        catch(err)
        {
            console.error(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        setLoading(false);
    }

    const handleExitGroup = async() => {
        setLoading(true);
        try{
            await axios.put(`${server_url}/chat/leave`,{chatId},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Group Exited");
        }
        catch(err)
        {
            console.error(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        setLoading(false);
    }



    const changeGroupNameHandler = async () => {
        setIsRenameGroup(false);
        setLoading(true)
        const toastId = toast.loading("Renaming group name")
        try{
            await axios.put(`${server_url}/chat/${chatId}`,{newName: chatDetails?.name},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Group name changed");

        }
        catch(err)
        {
            console.error(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        toast.dismiss(toastId);
        setLoading(false);
    }

    useEffect(() => {
        getChatDetails();
    }, [])

    
  const getOtherMember = (friend) => {
    return friend?.members?.find((member) => member._id !== user._id);
  }

  return (
    <div className='mx-5 my-5 w-full overflow-auto'>
        <div>
            <IoArrowBack size={24}/>
        </div>

        <div className='mt-10 flex flex-col items-center w-full'>
            <div className='h-[200px] w-[200px] bg-black rounded-full'>

            </div>

            {
                !isGroup ? (
                <div className='mt-5 flex flex-col items-center'>
                    <p className='text-lg font-medium'>{getOtherMember(chatDetails)?.name}</p>
                    <p>{getOtherMember(chatDetails)?.username}</p>
                </div>
                ) : (

                    <div className='flex items-center gap-[-15px] mt-5 '>
                        <input
                            disabled={!isRenameGroup}
                            type='text'
                            value={chatDetails?.name}
                            onChange={(e) => {
                                setChatDetail(prev => (
                                    {
                                        ...prev,
                                        name : e.target.value
                                    }
                                ))
                            }}
                            className='text-2xl font-semibold bg-white  w-fit  inline-block outline-none'
                            style={{ width: `${chatDetails?.name?.length }ch` }}
                        />
                        {
                            isRenameGroup ? (
                                <FaCheck onClick={changeGroupNameHandler}/>
                            ) : (
                                <BsFillPencilFill size={20} onClick={() => setIsRenameGroup(true)} className='ml-[-10px]' />
                            )
                        }
                    </div>
                )
                
            }
        </div>

        <div className='w-[80%] mt-20 mx-auto'>
        {
            !isGroup && (
                <div>
                    {
                        getOtherMember(chatDetails).email && (
                            <div className='flex items-center gap-5'>
                                <p className='font-medium'>Email Add:</p>
                                <div className='bg-[#E5E8ED] py-2 px-4 rounded-[4px] outline-none w-fit'>{getOtherMember(chatDetails).email}</div>
                            </div>
                        )
                    }

                    {
                        getOtherMember(chatDetails)?.bio && (
                            <div className='flex items-center gap-5 mt-5'>
                                <p className='font-medium'>About me:</p>
                                <div className='bg-[#E5E8ED] py-2 px-4 rounded-[4px] outline-none w-[70%]'>{getOtherMember(chatDetails)?.bio}</div>
                            </div>
                        )
                    }
                    
                   
                    <div className='mt-20 flex justify-end'>
                        <button 
                        onClick={() => dispatch(setIsUsfriendOpen(true))}
                        className='py-2 px-5 bg-[#fd4f50] text-white rounded-md font-medium'>
                            Unfriend
                        </button>
                    </div>
                </div>
            )
        }
        {
            isGroup && (
                <div>
                   <div className='flex justify-between items-center'>
                    <p className='font-medium'>Group members</p>
                    <button 
                      onClick={() => {
                        setOpen(true);
                        dispatch(setIsNewGroup(false))
                      }}
                      className='py-2 px-5 bg-[#fd4f50] text-white rounded-md '>
                            Add Members
                        </button>
                    </div>
                   <div className='flex flex-col gap-5 mt-5'>
                      {
                        chatDetails?.members?.map((member) => (
                            <div className='flex justify-between border rounded-md py-[6px] px-3 ' key={member._id}>
                                <div className='flex gap-3'>
                                    <div className='h-[44px] w-[44px] bg-black rounded-full'>
                                        <img
                                            src={member?.avatar?.url}
                                            className='rounded-full'
                                        />
                                    </div>
                                    <div>
                                        <h2 className='font-medium font-sans'>{member?.name}</h2>
                                        <p className='text-sm -mt-1'>{member?.username}</p>
                                    </div>
                                </div>  

                                <div onClick={() => handleRemoveMembers(member._id)}>
                                    remove
                                </div>
                            </div>
                        ))
                      }
                   </div>
                   <div className='my-4 flex justify-end '>
                     <div onClick={handleExitGroup}
                     className='mt-2 text-[#fd4f50] py-2 px-5 rounded-md border border-[#fd4f50]'>
                        Exit Group
                     </div>
                   </div>                   
                </div>
            )
        }

        </div>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 outline-none py-8 px-14 w-[600px] bg-white rounded-md shadow-custom">
           <p className='font-medium font-sans mb-5'>Add Members</p>
           <AddMembers members={newMembers} setMembers={setNewMembers} groupMembers={chatDetails?.members}/>
          <div className='mt-5 flex justify-end'>
            <button 
            onClick={handleAddMember}
             className='py-2 px-5 bg-[#fd4f50] text-white rounded-md '>
                Add 
            </button>
          </div>
        </div>
      </Modal>

      {
        isUnfriendOpen && (
            <UnFriend getOtherMember={() => getOtherMember(chatDetails)}/>
        )
      }
    </div>
  )
}

export default ChatInfo