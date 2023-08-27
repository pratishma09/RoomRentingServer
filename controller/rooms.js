const Room= require("../models/RoomListing");

const getRooms=async(req,res,next)=>{
    try{
        //for search query
        const search=req.query.search||"";
        const minPrice=parseFloat(req.query.minPrice)||0;
        const maxPrice=parseFloat(req.query.maxPrice)||Number.MAX_VALUE;
        const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        const rooms=await Room.find({
                address:{
                    //for case-insensitive
                    $regex:search, //regular expression
                    $options:"i",
                },
                price:{
                    $gte:minPrice,
                    $lte:maxPrice
                },
                closing_date:{
                    $gte: currentDate
                }
        }).sort({"posted_date": -1});//sorting
        res.json(rooms);
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