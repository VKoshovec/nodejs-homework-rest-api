const { Types } = require('mongoose');
const HttpErr = require('../helpers/HttpErorr')

function validateId (req, res, next) {

    const { contactId } = req.params;

    if( !Types.ObjectId.isValid( contactId ) ) throw HttpErr(404); 

    next();
}

module.exports = validateId;