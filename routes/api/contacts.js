const express = require('express');
const { validatePostData, validatePutData } = require('../../validators/validateData');
const { listContacts, getContactById, dellContact, addContact, updContact } = require('../../controllers/controllers');
 
const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validatePostData, addContact);

router.delete('/:contactId', dellContact);

router.put('/:contactId', validatePutData, updContact);

module.exports = router;