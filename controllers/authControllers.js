const { Users } = require('../models/users');
const HttpErr = require('../helpers/HttpErorr');
const controlWrapper  = require('../helpers/controlsWrapper');
const bcrpt = require('bcryptjs');


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

module.exports = {
    registerUser: controlWrapper(registerUser),
};
