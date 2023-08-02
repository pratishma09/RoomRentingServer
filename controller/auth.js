const User= require("../models/user");
var jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            let user_pass = await User.findOne({ email: req.body.email }).select("password")
            
            if (user_pass.password === req.body.password) {
                res.send("Login Successfully");
                const token=await user.generateAuthToken();
                console.log(token);
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
            const user = await User({firstname,lastname,email,password});
            
             await user.save();
            res.send({message:"user registered successfully"})
        } catch (err) {
        next(err);
    }
};

module.exports= {
    login,
    signup
};