import React from 'react'

const AddFriend = ({user}) => {
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

        <button className='bg-[#fd4f50] text-white rounded-b-md py-2 w-full'>
            Send Request
        </button>
    </div>
  )
}

export default AddFriend