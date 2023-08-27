const User= require("../models/user");
var jwt = require('jsonwebtoken');//json is a combination of header, payload and signature
const bcrypt = require("bcryptjs")
const sendEmail=require('./../middlewares/email')
const crypto=require('crypto');

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        }); 
        if (user) {
            let user_pass = await User.findOne({ email: req.body.email }).select("password")
            let match_status = await bcrypt.compare(req.body.password, user_pass.password);
            
            if (match_status) {
                const token=jwt.sign({id:user._id},
                    'secretkey'
                    );
                    res.status(200).send({
                        status:true,
                        token
                    });
                    
            }
            else res.status(401).send({
                msg: "wrong password"})
        }
        return res.status(401).send({
            msg: "Invalid credentials"
        })
    } catch (err) {
        next(err)
    }
};

const signup = async (req, res, next) => {
        const {firstname,lastname,email,password}=req.body;
        try{
            const userExist= await User.findOne({email:email});
            if(userExist){
                return res.status(422).json({error:"Email already exists"});
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User({firstname,lastname,email,password:hashedPassword});
            
            await user.save();
            res.send({message:"user registered successfully"})
        } catch (err) {
        next(err);
    }
};

const forgotPassword = async (req, res,next) => {
        //getting user
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).send("No such user exists.");
        }

        //generate a random reset token
        const resetToken=user.createResetPasswordToken();
        await user.save({validateBeforeSave:false});

        const resetUrl=`${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
        const message=`We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid for only 10 minutes.Your recovery key is ${resetToken}`
        try{
        await sendEmail({
            email:user.email,
            subject:'Password change request received',
            message:message
        });
        res.status(200).json({
            status:'success',
            message:'password reset link sent to the user email'
        })
    }
    catch(err){
        user.passwordResetToken=undefined;
        user.passwordResetTokenExpires=undefined;
        user.save({validateBeforeSave:false});
        next(err);
    }
}

const resetPassword=async(req,res,next)=>{
    //checking if user exists with the given token or if the token has not expiredd
    const token=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}});

    if(!user){
        return res.status(404).send("Token is invalid or has expired");
    }
    //resetting the password
    user.password=req.body.password;
    user.confirmPassword=req.body.confirmPassword;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.passwordResetToken=undefined;
    user.passwordResetTokenExpires=undefined;

    user.save();

    //login the user
    const logintoken=jwt.sign({id:user._id},
        'secretkey'
        );
        res.status(200).send({
            status:true,
            logintoken
        });
}

module.exports= {
    login,
    signup,
    resetPassword,
    forgotPassword
};