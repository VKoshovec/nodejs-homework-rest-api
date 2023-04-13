const HttpErr = require('../helpers/HttpErorr');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/users');
const { SECRET_KEY } = process.env; 

async function authorization (req, res, next) {
  const { authorization ="" } = req.headers;
  const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        next(HttpErr(401));
    };

    try {
        const { id } = jwt.verify(token, SECRET_KEY);

        const user = await Users.findById(id);

        if(!user || !user.token) {
            next(HttpErr(401));
        }

        req.user = user;
        next();

    } catch (error) {
        next(HttpErr(401));
    }
};

module.exports = authorization;