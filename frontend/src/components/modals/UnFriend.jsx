import React from 'react'
import { server_url } from '../../constants/envConfig';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setIsUsfriendOpen } from '../../redux/slices/tabSlice';
import { Modal } from '@mui/material';

const UnFriend = ({getOtherMember}) => {
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(setIsUsfriendOpen(false))
    }

    console.log(getOtherMember())

    const unFriendHandler = async () => {
        try{
            const {data} = await axios.get(`${server_url}/user/logout`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            toast.success("logout");            
        }
        catch(err)
        {
            toast.error(err.response.data.message || "Something went wrong");
        }
        navigate("/login")

    }

  return (
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 outline-none py-8 px-14 w-[400px] bg-white rounded-md shadow-custom">
        <h2 className='text-lg font-medium '>Do you want to unfriend {getOtherMember()?.name}?</h2>
        <div className='mt-8 flex justify-around w-full'>
            <button className='py-1 font-medium' 
                onClick={handleClose}>
                Cancel
            </button>

            <button 
            onClick={unFriendHandler}
            className='py-1 px-3 bg-[#FD4F50] rounded-md text-white'>
                Yes
            </button>
        </div>
        </div>
      </Modal>

  )
}

export default UnFriend