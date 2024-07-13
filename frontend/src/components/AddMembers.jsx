import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdOutlineRemove } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { server_url } from '../constants/envConfig';

const AddMembers = ({members, setMembers,groupMembers}) => {
  const [friends, setFriends] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const {isNewGroup} = useSelector((state) => state.chat);
  

  const addMembersHandler = (id) => {
      if(members.includes(id))
      {
        const newMembers  = members.filter(memberId =>  memberId !== id);
         setMembers(newMembers);
      }
      else{
        setMembers([...members, id]);
      }
  }
  

  const getMyAllFriends = async () => {
     try{
         const res = await axios.get(`${server_url}/user/friends`,{
             headers:{
                 Authorization: `Bearer ${token}`
             }
         });

         console.log(res);
         

         if(!isNewGroup)
         {
            const newFriends = res?.data?.friends?.filter(friend => (
              !groupMembers.some(member => member._id === friend._id)
          ))

          setFriends(newFriends);
         }
         else{
          setFriends(res.data.friends)
         }
         

     }
     catch(err)
     {
         console.error(err);
         toast.error(err.response.data.message || "Something went wrong",);
     }
  }


  useEffect(() => {
    getMyAllFriends()
  }, [groupMembers])

  return (
    <div className='flex flex-col gap-3 mt-2 overflow-hidden overflow-y-scroll w-full h-[400px]'>
      {
        friends?.map((friend) => (
          <div key={friend._id} 
          onClick={() => addMembersHandler(friend._id)}
          className='flex justify-between border rounded-md py-[6px] px-3 '>
            <div className='flex gap-3'>
              <div className='h-[44px] w-[44px] bg-black rounded-full'>
                <img src={friend?.avatar?.url}
                  className='rounded-full'
                />
              </div>
              <div>
                <h2 className='font-medium font-sans'>{friend?.name}</h2>
                <p className='text-sm -mt-1'>{friend?.username}</p>
              </div>
            </div>
            <div className='p-[6px] rounded-full bg-[#fd4f50] cursor-pointer my-auto text-white'>
             {
                members.includes(friend._id) ? (
                  <MdOutlineRemove/>
                ) : (
                  <IoMdAdd/>
                )
             }
            </div>
        </div>
        ))
      }
    </div>
    
  )
}

export default AddMembers