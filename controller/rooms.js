const Room= require("../models/RoomListing");

//const{getRooms, postRooms, putRoom, deleteRoom}=require("../controller/rooms");
const getRooms=async(req,res,next)=>{
    try{
        const rooms=await Room.find({})
        res.json(rooms)
    }
    catch(err){
        console.log(err);
    }
}

const postRooms= async(req, res, next)=>{
    try{
        let images = req.files.map(file => file.filename);  //images is a file that contains the names of the files that are uploaded
        let rooms= await Room.create({
            ...req.body,images
        });
        res.send(rooms);
    }
    catch(err){
        console.log(err);
    }
}

module.exports={getRooms,postRooms}