import {v2 as cloudinary} from "cloudinary"
import { getBase64 } from "./features.js";
import { v4 as uuid } from "uuid";

export const connectCloudinary = () => {
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_API_SECRET,
        })

        console.log("cloudinary connected successfully");
    }
    catch(error)
    {
        console.log(error);
    }
}

export const uploadFilesToCloudinary = async (files = []) => {
    const folderName = process.env.CLOUDINARY_FOLDER_NAME;
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const publicId = `${folderName}/${uuid()}`
        cloudinary.uploader.upload(
          getBase64(file),
          {
            resource_type: "auto",
            public_id: publicId,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
  
      const formattedResults = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
      return formattedResults;
    } catch (err) {
      throw new Error("Error uploading files to cloudinary", err);
    }
  };