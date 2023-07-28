const mongoose= require("mongoose")
require("mongoose-type-email");

const userSchema= new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: mongoose.SchemaTypes.Email, 
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type:String,
        minlength: 8,
        required: true,
        select:false,
    },
    

},
{collation:{locale: "en"}}
)

const User= mongoose.model('User', userSchema);
module.exports=User;