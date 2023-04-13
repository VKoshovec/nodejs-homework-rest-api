const express = require('express');
const { validatePostData, validatePutData, validateFavoriteData } = require('../../validators/validateContactsData');
const controllers = require('../../controllers/contactsControllers');
const authorization = require('../../middlewares/authorization');
const validateId = require('../../middlewares/validateId');
 
const router = express.Router();

router.get('/', authorization, controllers.listContacts);

router.get('/:contactId', authorization, validateId, controllers.getContactById);

router.post('/', authorization, validatePostData, controllers.addContact);

router.delete('/:contactId', authorization, validateId, controllers.dellContact);

router.put('/:contactId', authorization, validateId, validatePutData, controllers.updContact);

router.patch('/:contactId/favorite', authorization, validateId, validateFavoriteData, controllers.updateStatusContact);

module.exports = router;