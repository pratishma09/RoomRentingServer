const User= require("../models/users");

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            let user_pass = await User.findOne({ email: req.body.email }).select("password")
            console.log(user_pass);
            console.log(user_pass.password);
            if (user_pass.password === req.body.password) {
                res.send("Login Successfully");
            }
            else res.status(401).send({
                msg: "wrong password"})
        }
        return res.status(401).send({
            msg: "Invalid Credentials"
        })
    } catch (err) {
        next(err)
    }
};

const signup = async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
};

module.exports= {
    login,
    signup
};