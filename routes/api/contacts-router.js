const express = require('express');
const { validatePostData, validatePutData, validateFavoriteData } = require('../../validators/validateContactsData');
const controllers = require('../../controllers/contactsControllers');
const authorization = require('../../middlewares/authorization');
 
const router = express.Router();

router.get('/', authorization, controllers.listContacts);

router.get('/:contactId', authorization, controllers.getContactById);

router.post('/', authorization, validatePostData, controllers.addContact);

router.delete('/:contactId', authorization, controllers.dellContact);

router.put('/:contactId', authorization, validatePutData, controllers.updContact);

router.patch('/:contactId/favorite', authorization, validateFavoriteData, controllers.updateStatusContact);

module.exports = router;