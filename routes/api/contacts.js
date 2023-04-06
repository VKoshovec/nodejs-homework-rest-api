const express = require('express');
const { validatePostData, validatePutData, validateFavoriteData } = require('../../validators/validateData');
const controllers = require('../../controllers/controllers');
 
const router = express.Router();

router.get('/', controllers.listContacts);

router.get('/:contactId', controllers.getContactById);

router.post('/', validatePostData, controllers.addContact);

router.delete('/:contactId', controllers.dellContact);

router.put('/:contactId', validatePutData, controllers.updContact);

router.patch('/:contactId/favorite', validateFavoriteData, controllers.updateStatusContact);

module.exports = router;