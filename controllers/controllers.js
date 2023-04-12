const { Contacts, checkId } = require('../models/contacts');

const HttpErr = require('../helpers/HttpErorr');
const controlWrapper  = require('../helpers/controlsWrapper');

async function listContacts ( req, res) {
      const result = await Contacts.find({});
      res.json(result);
};

async function getContactById (req, res) {
      const { contactId } = req.params;    

      checkId(contactId, HttpErr(404));

      const result = await Contacts.findById(contactId);
      if(!result) { throw HttpErr(404) };  
  
      res.json(result);
};

async function dellContact (req, res) {
      const { contactId } = req.params;

      checkId(contactId, HttpErr(404));

      result = await Contacts.findByIdAndDelete(contactId);
      if(!result) {throw HttpErr(404)};
  
      res.status(200).json({
        "message": "contact deleted"
      });
};

async function addContact (req, res) {
      const result = await Contacts.create(req.body);
      res.status(201).json(result);
};

async function updContact (req, res)  {
      const { contactId } = req.params;  

      checkId(contactId, HttpErr(404));

      const result = await Contacts.findByIdAndUpdate( contactId, req.body, { new: true});
      if(!result) {
          throw HttpErr(404);
      }
  
      res.json(result);
};

async function updateStatusContact (req, res) {

    const { contactId } = req.params;  

    checkId(contactId, HttpErr(404));

    const result = await Contacts.findByIdAndUpdate( contactId, req.body, { new: true});
    if(!result) {
        throw HttpErr(404);
    }

    res.json(result);
};

module.exports = {
    listContacts: controlWrapper(listContacts),
    getContactById: controlWrapper(getContactById),
    dellContact: controlWrapper(dellContact),
    addContact: controlWrapper(addContact),
    updContact: controlWrapper(updContact),
    updateStatusContact: controlWrapper(updateStatusContact)
};