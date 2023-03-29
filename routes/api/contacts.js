const express = require('express');
const Joi = require("joi");
const contacts = require('../../models/contacts');
const HttpErr = require('../../helpers/HttpErorr');

const addSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `name is required`,
      "string.empty": `name cannot be empty`,
      "string.base": `name must be string`
  }),
  email: Joi.string().required().messages({
      "any.required": `email is required`,
      "string.empty": `email cannot be empty`,
      "string.base": `email must be string`
  }),
  phone: Joi.string().required().messages({
      "any.required": `phone is required`,
      "string.empty": `phone cannot be empty`,
      "string.base": `phone must be string`
}),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
   
    if(!result) {throw HttpErr(404)};  

    res.json(result);

  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {

    const {error} = addSchema.validate(req.body);

    if(error) {
      throw HttpErr(400, error.message);
    };

    const result = await contacts.addContact(req.body);
    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    result = await contacts.removeContact(contactId);

    if(!result) {throw HttpErr(404)};

    res.status(200).json({
      "message": "contact deleted"
    });

  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {

    const {error} = addSchema.validate(req.body);

    if(error) {
        throw HttpErr(400, error.message);
    }
    const { contactId } = req.params;

    const result = await contacts.updateContact( contactId, req.body );

    if(!result) {
        throw HttpErr(404);
    }

    res.json(result);
}
catch(error) {
    next(error);
}

});

module.exports = router
