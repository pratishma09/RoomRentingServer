const express = require('express');   //importing express module
const router = express.Router();   //creates an instance of express router by calling 'router' function

const { login,signup,forgotPassword,resetPassword } = require("../controller/auth")      //importing login and signup function from a module

router.post("/login", login);   //login and signup handles post request
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token",resetPassword);

module.exports = router;    //allowing other modules to import and use defined routes