const { Users } = require('../models/users');
const HttpErr = require('../helpers/HttpErorr');
const controlWrapper  = require('../helpers/controlsWrapper');
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;


async function registerUser (req, res) {

    const { password, email } = req.body;
    const user = await Users.findOne({email});

    if (user) throw HttpErr(409, "Email in use") ;

    const soltPasw = await bcrpt.hash(password, 10);
    const result = await Users.create({ password: soltPasw, email });

    res.status(201).json({ "user":
        {"email": result.email,
        "subscription": result.subscription,}
    }); 
};

async function loginUser (req, res) {

   const { password, email } = req.body;
   const user = await Users.findOne({email});

   if(!user) { throw HttpErr(401, "Email or password is wrong") };

   const checkPassword = await bcrpt.compare(password, user.password);

   if(!checkPassword) { throw HttpErr(401, "Email or password is wrong") };

   const payload = {
    id: user._id,
   };

   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

   const result = await Users.findByIdAndUpdate(user._id, { token }, { new: true });

   res.status(200).json({
    token,
    "user":
        {"email": result.email,
        "subscription": result.subscription,}
   });

};

async function logoutUser (req, res) {

    const {_id} = req.user;

    await Users.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();

};

async function currentUser (req, res) {
    const { _id } = req.user;

    const{ email, subscription } = await Users.findById(_id);

    res.json({
        email, subscription
    });
};

module.exports = {
    registerUser: controlWrapper(registerUser),
    loginUser: controlWrapper(loginUser),
    logoutUser: controlWrapper(logoutUser),
    currentUser: controlWrapper(currentUser),
};
