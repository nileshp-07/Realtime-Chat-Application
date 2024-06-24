import multer from "multer"

const multerUploader = multer({
    limits : {
        fileSize : 1024 *1024 * 5 // 5MB
    }
})


const attachmentMulter = multerUploader.array("files" , 5) // 5 ->maxFile allowed


export {attachmentMulter};