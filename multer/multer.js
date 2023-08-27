const multer = require("multer");

//Setting storage engine
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        //specifies the directory where the file is stored, the 2 arguments indicate that there is no error for null, and destination path is uploads
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
});

// filter to check the image's type
const filefilter = (req,file,callback)=>{
    if(file.mimetype === "image/png" ||file.mimetype === "image/jpg" ||file.mimetype === "image/jpeg" ||file.mimetype==="image/svg" || file.mimetype==="image/gif"){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only .png .jpg & .jpeg formatted Allowed"))
    }
}

const upload = multer({
    storage:storage,
    fileFilter:filefilter
});

module.exports = upload;