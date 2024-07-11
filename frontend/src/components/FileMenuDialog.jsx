import React, { useRef } from 'react'
import {ListItemText, Menu, MenuItem, MenuList, Tooltip} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenuOpen } from '../redux/slices/tabSlice';
import {Image as ImageIcon, AudioFile as AudioFileIcon, VideoFile as VideoFileIcon, UploadFile as UploadFileIcon} from "@mui/icons-material"
import toast from 'react-hot-toast';
import { server_url } from '../constants/envConfig';
import axios from 'axios';

const FileMenuDialog = ({archorElement, chatId}) => {
   const {token} = useSelector((state) => state.auth)
   const imageRef = useRef(null)
   const audioRef = useRef(null)
   const videoRef = useRef(null)
   const fileRef = useRef(null)
   const {isFileMenuOpen} = useSelector((state) => state.tab);
   const dispatch = useDispatch();

   const closeFileMenu = () => {
      dispatch(setIsFileMenuOpen(false))
   }
   const selectRef = (ref) => {
      ref.current.click();
   }
   const fileChangeHandler = async(e, key) => {
        const files = Array.from(e.target.files);

        if(files.length === 0)
        {
            return toast.error(`Please select a ${key} first`);
        }

        if(files.length > 5){
            return toast.error(`You can send 5 ${key} at a time`);
        }

        const toastId = toast.loading(`sending ${key}`);
        closeFileMenu();


        // now upload the files into cloudinary 
        try{
            const fileForm = new FormData();

            fileForm.append("chatId" ,chatId);
            files.forEach(file => fileForm.append("files", file))


            const res = await axios.post(`${server_url}/chat/send-attachments`,fileForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(res) toast.success(`${key} sent successfully`)
            else toast.error(`Failed to send ${key}`);

            console.log(res);
        }
        catch(err)
        {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
        
        toast.dismiss(toastId);
   }


  return (
    <Menu anchorEl={archorElement} open={isFileMenuOpen} onClose={closeFileMenu}>
        <div className='w-[10rem]'>
           <MenuList>
                <MenuItem onClick={() => selectRef(imageRef)}>
                    <ImageIcon/>
                    <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
                    <input
                        ref={imageRef}
                        type='file'
                        multiple
                        accept='image/png, image/jpeg, image/gif'
                        style={{display: "none"}}
                        onChange={(e) => fileChangeHandler(e, "Images")}
                    />
                </MenuItem>

                <MenuItem onClick={() => selectRef(audioRef)}>
                    <AudioFileIcon/>
                    <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
                    <input
                        ref={audioRef}
                        type='file'
                        multiple
                        accept='audio/mpeg, audio/mav'
                        style={{display: "none"}}
                        onChange={(e) => fileChangeHandler(e, "Audios")}
                    />
                </MenuItem>

                <MenuItem onClick={() => selectRef(videoRef)}>
                    <VideoFileIcon/>
                    <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
                    <input
                        ref={videoRef}
                        type='file'
                        multiple
                        accept='video/mp4, video/webm, video/ogg'
                        style={{display: "none"}}
                        onChange={(e) => fileChangeHandler(e, "Videos")}
                    />
                </MenuItem>

                <MenuItem onClick={() => selectRef(fileRef)}>
                    <UploadFileIcon/>
                    <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
                    <input
                        ref={fileRef}
                        type='file'
                        multiple 
                        accept='*'
                        style={{display: "none"}}
                        onChange={(e) => fileChangeHandler(e, "Files")}
                    />
                </MenuItem>
           </MenuList>
        </div>
        
    </Menu>
  ) 
}

export default FileMenuDialog