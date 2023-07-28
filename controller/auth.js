const User= require("../models/users");

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user && user.password === req.body.password) {
            res.send("Login Successfully");
        } else {
            res.status(401).send({
                msg: "Invalid credentials",
            });
        }
    } catch (err) {
        next(err);
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