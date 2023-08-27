const express=require("express");
const router = express.Router();
const upload=require("../multer/multer")

const{getRooms, postRooms, putRooms,deleteRooms}=require("../controller/rooms");
const authMiddleware=require("../middlewares/authMiddleware");

//for uploading images
router.post("/rooms",upload.single('images'),postRooms);   //login and signup handles post request
router.get("/rooms", getRooms);
router.put("/rooms/:id",authMiddleware, upload.single('images'),putRooms);
router.delete("/rooms/:id",authMiddleware, deleteRooms)

module.exports = router;