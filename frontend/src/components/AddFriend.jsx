import React, { useState } from 'react'
import {server_url}  from "../constants/envConfig"
import axios from "axios"
import toast from "react-hot-toast"
import { useSelector } from 'react-redux'

const AddFriend = ({user}) => {
    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

   const sendFriendRequestHandler = async () => {
      setLoading(true);
      try{
        const res = await axios.post(`${server_url}/user/sendrequest`,{receiverId: user._id,},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

          toast.success("Friend Request Sent!!");

      }
      catch(err)
      {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong!!");
      }
      setLoading(false);
   }

  return (
    <div className='w-[170px] shadow-custom rounded-md '>
        
        <div className='py-3 text-center px-4'>
            <div className='h-[70px] w-[70px] rounded-full mx-auto'>
                <img
                  src={user?.avatar?.url}
                  className='h-full w-full rounded-full'
                />
            </div>
            <h2 className='font-sans font-medium mt-2'>{user?.name}</h2>
            <p className='-mt-1'>{user?.username}</p>
        </div>

        <button
        onClick={sendFriendRequestHandler} 
        disabled = {loading}
        className={`${loading ? "bg-[#f66f6f]" : "bg-[#fd4f50]"} text-white rounded-b-md py-2 w-full`}>
            Send Request
        </button>
    </div>
  )
}

export default AddFriend