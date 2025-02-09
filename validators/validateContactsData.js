const Joi = require("joi");
const HttpErr = require('../helpers/HttpErorr');

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
        "string.empty": `name cannot be empty`,
        "string.base": `name must be string`
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be empty`,
        "string.base": `email must be string`
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing required phone field`,
        "string.empty": `phone cannot be empty`,
        "string.base": `phone must be string`
  }),
    favorite: Joi.boolean()
});

const putSchema = Joi.object().min(1);
  
const updFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
}).min(1);


function validatePostData (req, res, next) {

  const {error} = addSchema.validate(req.body);

  if(error) {
    throw HttpErr(400, error.message);
  };

  next();

};

function validatePutData (req, res, next) {

  const {error} = putSchema.validate(req.body);

  if(error) {
      throw HttpErr(400, "missing fields");
  }

  next();

};

function validateFavoriteData (req, res, next) {

  const {error} = updFavoriteSchema.validate(req.body);

  if(error) {
    throw HttpErr(400, "missing field favorite");
  };

  next();
}

module.exports = {
  validatePostData,
  validatePutData,
  validateFavoriteData
};