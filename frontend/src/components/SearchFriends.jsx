import React from 'react'
import { FiSearch } from "react-icons/fi";
import AddFriend from './AddFriend';

const SearchFriends = () => {
  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold '>Add Friends</h2>

        <form className='w-full'>
            <div className='my-10 w-full flex justify-between items-center gap-5 py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none'>
                <input
                    type='text'
                    name='searchFriend'
                    placeholder='search friends'
                    className='bg-[#E5E8ED] w-full outline-none placeholder:font-light'
                />
                <FiSearch size={24}/>
            </div>
        </form>

        <div className='grid grid-cols-2 gap-5 overflow-y-scroll p-2'>
          {
            Array.from({ length: 10 }).map((item, index) => (
               <AddFriend key={index}/>
            ))
          }
        </div>

    </div>
  )
}

export default SearchFriends