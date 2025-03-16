import React, { useState } from 'react'
import AddMembers from '../AddMembers'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { server_url } from '../../constants/envConfig';
import { setCurrTabModal } from '../../redux/slices/tabSlice';

const AddGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [loading , setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCreateGroup = async () => {
     if(!groupName) return toast.error("Please Enter the Group name first")
     
     if(members.length < 2) return toast.error("Min 2 members required to Create a group");

     setLoading(true)
     const toastId = toast.loading("Creating Group...");
     try{
        const res = await axios.post(`${server_url}/chat/new-group`, {name: groupName, members}, {
          headers : {
             Authorization : `Bearer ${token}`
          }
        })

        console.log(res);

        toast.success("Group Created", {id: toastId});

        dispatch(setCurrTabModal("Messages"));
     }
     catch(err)
     {
       console.error(err);
       toast.error(err.response.data.message || "Something went wrong", {id: toastId});
     }
     setLoading(false);
  }
  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold mb-10'>Create a Groups</h2>

        <input
          type='text'
          placeholder='Enter Group name'
          name='groupName'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className='bg-[#E5E8ED] w-full py-2 px-4 rounded-[4px] outline-none placeholder:font-light'
        />
        <div className='w-full mt-8'>
          <p>Members (add min 3 members)</p>

          <AddMembers members={members} setMembers={setMembers} />

          <div className='flex justify-end'>
            <button
              onClick={handleCreateGroup}
              className='text-white py-2 px-5 bg-[#fd4f50] font-medium  rounded-md mt-5'>Create Group
            </button>
          </div>
        </div> 
    </div>
  )
}

export default AddGroup