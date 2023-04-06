const { Contacts } = require('../models/contacts');
const HttpErr = require('../helpers/HttpErorr')

async function listContacts ( req, res, next) {
    try {
      const result = await Contacts.find({});
      res.json(result);
    } catch (error) {
      next(error);
    }
};

// async function getContactById (req, res, next) {
//     try {
//       const { contactId } = req.params;
//       const result = await contacts.getContactById(contactId);
     
//       if(!result) {throw HttpErr(404)};  
  
//       res.json(result);
  
//     } catch (error) {
//       next(error);
//     }
// };

// async function dellContact (req, res, next) {
//     try {
//       const { contactId } = req.params;
//       result = await contacts.removeContact(contactId);
  
//       if(!result) {throw HttpErr(404)};
  
//       res.status(200).json({
//         "message": "contact deleted"
//       });
  
//     } catch (error) {
//       next(error);
//     }
// };

// async function addContact (req, res, next) {
//     try {
    
//       const result = await contacts.addContact(req.body);
//       res.status(201).json(result);
  
//     } catch (error) {
//       next(error);
//     }
// };

// async function updContact (req, res, next) {

// try {
//       const { contactId } = req.params;  
//       const result = await contacts.updateContact( contactId, req.body );
  
//       if(!result) {
//           throw HttpErr(404);
//       }
  
//       res.json(result);
// }
//   catch(error) {
//       next(error);
// }
  
//   }

module.exports = {
    listContacts,
    // getContactById,
    // dellContact,
    // addContact,
    // updContact
};