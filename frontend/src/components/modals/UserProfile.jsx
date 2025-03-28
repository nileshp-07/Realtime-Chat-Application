import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const UserProfile = () => {
    const {user} = useSelector((state) => state.auth)
    const [userDetails, setUserDetails] = useState({
        name : user?.name,
        username : user?.username,
        email : user?.email,
        bio : user?.bio,
        dateOfBirth : user?.dateOfBirth,
        gender:  user?.gender
    })
  return (
    <div className="flex flex-col items-center  py-8 px-14 w-[700px] bg-white outline-none rounded-md shadow-custom">
        <div className='h-[200px] w-[200px] flex items-center justify-center rounded-full border border-[#fd4f50]'>
            {
                user?.avatar?.url ? (
                     <img
                        src={user?.avatar?.url}
                        className='h-full w-full rounded-full'
                    />
                ) : (
                    <FaUserAlt size={100}/>
                )
            }
        </div>

        <div className='w-full mt-8'>
          <form>
            <div className='flex flex-col'>
                 <label>Name:</label>
                 <input
                    type='text'
                    name='name'
                    value = {userDetails?.name}
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 />
             </div>
             <div className='flex flex-col mt-5'>
                 <label>Username:</label>
                 <input
                    disabled
                    type='text'
                    name='username'
                    value = {userDetails?.username}
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 />
             </div>

             <div className='flex flex-col mt-5'>
                 <label>Email Address:</label>
                 <input
                    type='email'
                    name='email'
                    value = {userDetails?.email}
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 />
             </div>
             <div className='flex flex-col mt-5'>
                 <label>About me:</label>
                 <textarea
                    cols="10"
                    className='py-2 px-4 h-[70px] bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 >
                    {userDetails?.bio}
                 </textarea>
             </div>
 
             <div className='mt-5 flex gap-10'>
                <div className='flex flex-col'>
                    <label>Gender:</label>
                    <input
                        type='text'
                        name='gender'
                        value = {userDetails?.gender}
                        className='py-2  px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light'
                    />
                </div>
                <div className='flex flex-col'>
                    <label>Date of Birth:</label>
                    <input
                        type='text'
                        name='DOB'
                        value = {userDetails?.dateOfBirth}
                        className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                    />
                </div>
             </div>

             <button className='py-2 px-5 text-white bg-[#fd4f50]  rounded-md mt-8 '>
                Save Changes
             </button>

          </form>
        </div>
    </div>
  )
}

export default UserProfile