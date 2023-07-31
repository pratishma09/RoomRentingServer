const express=require("express");
const router = express.Router();
const upload=require("../multer/multer")

const{getRooms, postRooms, putRooms,deleteRooms}=require("../controller/rooms");

//for uploading images
router.post("/rooms",upload.single('images'),postRooms);   //login and signup handles post request
router.get("/rooms", getRooms);
router.put("/rooms/:id", upload.single('images'),putRooms);
router.delete("/rooms/:id", deleteRooms)

module.exports = router;