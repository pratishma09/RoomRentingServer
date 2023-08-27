const mongoose= require("mongoose")
const crypto=require("crypto")
require("mongoose-type-email");

const users= new mongoose.Schema({
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
    passwordResetToken:String,
    passwordResetTokenExpires:Date,
},
{timestamps:true}, //to keep track of queries like update and delete
{collation:{locale: "en"}}
);

//plain token to send user
users.methods.createResetPasswordToken=function(){
    const resetToken =crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');//encrypting
    this.passwordResetTokenExpires=Date.now()+10*60*1000;
    console.log(resetToken,this.passwordResetToken)
    return resetToken;  //user will receive the plain resetToken
}

const User= mongoose.model('User', users);
module.exports=User;