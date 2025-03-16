import React from 'react'
import { fileFormat } from '../lib/features'
import { MdOutlineInsertDriveFile } from "react-icons/md";
const AttachmentComponent = ({url}) => {
  const formate = fileFormat(url);
  return (
    <a 
    href={url}
    target='_blank'
    download
    >
      {
         formate === "video" ? (
            <video src={url} preload='none' width={"200px"} controls/>
         ) : (
           formate === "image" ? (
              <img
                src={url}
                alt='attachment'
                width={"200px"}
                height={"150px"}
                style={{
                  objectFit : "contain"
                }}
              />
           ) : (
             formate === "audio" ? (
                <audio src={url} preload='none' controls/>
             ) : (
              <MdOutlineInsertDriveFile/>
             )
           )
         )
      }
    </a>
  )
}

export default AttachmentComponent