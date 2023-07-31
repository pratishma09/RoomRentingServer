const Room= require("../models/RoomListing");

//const{getRooms, postRooms, putRoom, deleteRoom}=require("../controller/rooms");
const getRooms=async(req,res,next)=>{
    try{
        //for pagenation
        const page=parseInt(req.query)||1;
        const limit=parseInt(req.query)||8;
        const startIndex=(page-1)*limit;
        const endIndex=startIndex+limit;

        //for search query
        const search=req.query.search||"";

        //sorting based on newest
        let sort=req.query.sort||"posted_date";
        const sortDirection=req.query.sortDirection||"desc";
        const sortBy={};
        sortBy[sort]=sortDirection==="desc"?-1:1;

        const rooms=await Room.find({
                address:{
                    //for case-insensitive
                    $regex:search,
                    $options:"i",
                }
        }).sort(sortBy);
        const items=rooms.slice(startIndex,endIndex);
        res.json({
            error:false,
            countPages:page,
            totalPages:Math.ceil((rooms.length)/limit),
            items: items})
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });        
    }
}

const postRooms= async(req, res, next)=>{
    try{
        let images = req.file?.filename || "";  //images is a file that contains the names of the files that are uploaded
        let rooms= await Room.create({
            ...req.body,images
        });
        res.send(rooms);
    }
    catch(err){
        console.log(err);
    }
}

const putRooms=async(req,res,next)=>{
        let db_rooms = await Room.findById(req.params.id)
        try {
            let rooms = await Room.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            res.send(rooms);
        } catch (err) {
            console.log(err);
        }
}

const deleteRooms = async (req, res, next) => {
    try {
        let db_rooms = await Room.findById(req.params.id)
        let rooms = await Room.findByIdAndDelete(req.params.id)
        res.send({
            data: rooms
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports={getRooms,postRooms,putRooms,deleteRooms}