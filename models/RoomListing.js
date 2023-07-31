const mongoose=require("mongoose")

const RoomListingSchema=new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    price:{
        type: Number,
    },
    coveredArea:{
        type: Number,
    },
    description:{
        type: String,
    },
    amenities:{
        type: [String],
        enum:[
            'Separate bathroom',
            '24/7 water facility',
            'Internet',
            'Car parking',
            'Bike parking',
            'Kitchen slab',
            'Furnished',
            'Gym',
            'Playing court'
        ]
    },
    noOfRooms:{
        type:Number,
        required: true,
    },
    images:{
        type:String
    },
    posted_date:{
        type:Date
    },
    closing_date:{
        type:Date
    },
    phone:{
        type:Number,
        required:true,
    }
}) ;

const RoomListing= mongoose.model('RoomListing', RoomListingSchema);
module.exports=RoomListing;