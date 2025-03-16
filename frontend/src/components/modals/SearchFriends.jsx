import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import AddFriend from '../AddFriend';
import toast from "react-hot-toast"
import { server_url } from '../../constants/envConfig';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SearchFriends = () => {
  const {token} = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([])

  const changeHandler = (e) => {
      e.preventDefault();
      const timeOutId = setTimeout(()=> {
        setSearchQuery(e.target.value)
      }, 1000)

      return () => clearTimeout(timeOutId);
  }


  const searchUsers = async () => {
      if(!searchQuery)
      {
         setUsers([])
         return;
      }  

     try{
        const res = await axios.get(`${server_url}/user/search`,{
          params: {
            name: searchQuery,
          },
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${token}`
          }
        })

        console.log(res.data.users)

        if(res){
          setUsers(res?.data?.users)
        }
     }
     catch(err)
     {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
     }
  }


  useEffect(() => {
     console.log("Called");
     searchUsers();
  }, [searchQuery])
  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold '>Add Friends</h2>

        <form className='w-full' onSubmit={changeHandler}>
            <div className='my-10 w-full flex justify-between items-center gap-5 py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none'>
                <input
                    type='text'
                    name='searchFriend'
                    placeholder='search friends'
                    className='bg-[#E5E8ED] w-full outline-none placeholder:font-light'
                    onChange={changeHandler}
                />
                <FiSearch size={24}/>
            </div>
        </form>

        {
           users.length > 0 && (
            <div className='grid grid-cols-2 gap-5 overflow-y-scroll p-2'>
            {
             users.map((user, index) => (
                <AddFriend key={index} user={user}/>
              ))
            }
          </div>
           )
        }

          {
             users.length === 0 && (
               <div className='py-5 w-full flex justify-center'>
                  <p className='text-lg font-medium'>
                    {
                       searchQuery ? "No users found" : "Search to find Users"
                    }
                  </p>
               </div>
             )
          }

    </div>
  )
}

export default SearchFriends