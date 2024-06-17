import React from 'react'
import AddMembers from './AddMembers'

const AddGroup = () => {
  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold mb-10'>Create a Groups</h2>

        <input
          type='text'
          placeholder='Enter Group name'
          name='groupName'
          className='bg-[#E5E8ED] w-full py-2 px-4 rounded-[4px] outline-none placeholder:font-light'
        />
        <div className='w-full mt-8'>
          <p>Members (add min 3 members)</p>

          <AddMembers/>

          <div className='flex justify-end'>
            <button
              className='text-white py-2 px-5 bg-[#fd4f50] font-medium  rounded-md mt-5'>Create Group
            </button>
          </div>
        </div> 
    </div>
  )
}

export default AddGroup