import React from 'react'
import { IoMdAdd } from "react-icons/io";


const AddMembers = () => {
  return (
    <div className='flex flex-col gap-3 mt-2 overflow-y-scroll w-full h-[400px]'>
      {
        Array.from({ length: 20 }).map((item,index) => (
          <div key={index} className='flex justify-between border rounded-md py-[6px] px-3 '>
            <div className='flex gap-3'>
              <div className='h-[44px] w-[44px] bg-black rounded-full'></div>
              <div>
                <h2 className='font-medium font-sans'>Nilesh Patidar</h2>
                <p className='text-sm -mt-1'>nileshp07</p>
              </div>
            </div>
            <div className='p-[6px] rounded-full bg-[#fd4f50] cursor-pointer my-auto'>
              <IoMdAdd size={24} fill='white'/>
            </div>
        </div>
        ))
      }
    </div>
    
  )
}

export default AddMembers