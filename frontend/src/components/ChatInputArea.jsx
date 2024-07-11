// import React from 'react'
// import { GrAttachment } from "react-icons/gr";
// import { RiSendPlaneFill } from "react-icons/ri";
// import { useDispatch } from 'react-redux';
// import { setIsFileMenuOpen } from '../redux/slices/tabSlice';
// import { getSocket } from '../sockets';
// import { START_TYPING } from '../constants/events';

// const ChatInputArea = ({message, setMessage, sendMessageHandler, setFileMenuAnchor, members, chatId}) => {
//     const dispatch = useDispatch();
//     const socket = getSocket();
    

//     const changeMessageHandler = (e) => {
//         setMessage(e.target.value)

//         socket.emit(START_TYPING , {members, chatId})
//     }
//     const handleFileMenuOpen = (e) => {
//         dispatch(setIsFileMenuOpen(true))
//         setFileMenuAnchor(e.currentTarget);
//     }
//   return (
//     <div className='flex gap-2 items-center justify-between w-[800px] mb-5 mx-auto rounded-full absolute bottom-0 left-[38%] bg-white '>
//         <div className='flex gap-3 items-center border border-black rounded-full py-3 px-4 w-full'>
//             <div 
//             onClick={handleFileMenuOpen}
//             className='cursor-pointer'>
//                 <GrAttachment size={20}/>
//             </div>
//             <div className=' w-full'>
//                 <form>
//                     <input
//                         autoFocus
//                         type='text'
//                         placeholder='Type a message'
//                         className='w-full outline-none'
//                         value={message}
//                         onChange={changeMessageHandler}
//                     />
//                 </form>
//             </div>
//         </div>
//         <button
//         type='submit' 
//         onClick={sendMessageHandler}
//         className='p-3 cursor-pointer rounded-full bg-[#fd4f50]'>
//             <RiSendPlaneFill size={24} fill='white'/>
//         </button>
//     </div>
//   )
// }

// export default ChatInputArea