const express=require("express");
const router = express.Router();
const upload=require("../multer/multer")

const{getRooms, postRooms}=require("../controller/rooms");

//for uploading images
router.post("/rooms",upload.array('images',12),postRooms);   //login and signup handles post request
router.get("/rooms", getRooms);

module.exports = router;