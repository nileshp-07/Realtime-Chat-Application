import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import {server_url} from "../../constants/envConfig"
import axios  from "axios";
import toast from "react-hot-toast"
import { useSelector } from 'react-redux';

const Notifications = () => {
  const [requests , setRequests] = useState([]);
  const [loading , setLoading] = useState(false);
  const {token}  = useSelector((state) => state.auth);


  const getAllRequestHandler = async () => {
     setLoading(true);
     try{
        const res = await axios.get(`${server_url}/user/notifications`, 
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(res);
        if(res) {
           setRequests(res?.data?.requests);
        }
     }
     catch(err)
     {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!!");
     }
     setLoading(false);
  }


const respondToRequestHandler = async (isAccepted, requestId, senderId) => {
    setLoading(true);
    
    try{
        const res = await axios.post(`${server_url}/user/acceptrequest`, {
           isAccepted,requestId,senderId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

        console.log(res);
        toast.success(isAccepted ? "Request Accepted!" : "Request Rejected");
        const remainingRequests = requests.filter(request => request._id !== requestId);
        setRequests(remainingRequests);
    }
    catch(err)
    {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!!");
    }
    setLoading(false);
}

  useEffect(() => {
    getAllRequestHandler()
  }, [])

  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] min-h-[400px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold'>Notifications</h2>

        {
           requests?.length > 0 ? (
            <div className='flex flex-col gap-3 mt-6 overflow-y-scroll w-full'>
            {
              requests.map((request) => (
                <div className='flex justify-between border rounded-md py-[6px] px-3 ' key={request?.id}>
                  <div className='flex gap-3'>
                    <div className='h-[44px] w-[44px] bg-black rounded-full'></div>
                    <div>
                      <h2 className='font-medium font-sans'>{request?.sender?.name}</h2>
                      <p className='text-sm -mt-1'>{request?.sender?.username}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-1' >
                      <div 
                      onClick={() => respondToRequestHandler(false, request._id, request?.sender?._id)}
                      className='p-[6px] text-[#ff4d6d] rounded-full cursor-pointer my-auto'>
                        <RxCross2 size={20}/>
                      </div>
                      <div 
                      onClick={() => respondToRequestHandler(true, request._id, request?.sender?._id)}
                      className='p-[6px] rounded-full text-[#4ad66d] cursor-pointer my-auto'>
                        <IoMdCheckmark size={22}/>
                      </div>
                  </div>
                </div>
              ))
            }
            </div>
            ) : (
               <div className='my-5 mt-10 flex justify-center h-full items-center '>
                 <p className='font-medium'>No Notifications Found!!</p>
               </div>
            )
        }
    </div>
  )
}

export default Notifications