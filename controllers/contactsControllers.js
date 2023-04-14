const { Contacts } = require('../models/contacts');

const HttpErr = require('../helpers/HttpErorr');
const controlWrapper  = require('../helpers/controlsWrapper');

async function listContacts ( req, res) {

      const { _id:owner } = req.user;
      const { page = 1, limit = 20, favorite } = req.query;

      console.log(favorite);

      const skip = (page - 1) * limit;

      const query = (favorite !== undefined)?{ owner, favorite }:{ owner };  

      const result = await Contacts.find(query, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
      res.json(result);
};

async function getContactById (req, res) {
      const { contactId } = req.params;    

      const result = await Contacts.findById(contactId);
      if(!result) { throw HttpErr(404) };  
  
      res.json(result);
};

async function dellContact (req, res) {
      const { contactId } = req.params;

      result = await Contacts.findByIdAndDelete(contactId);
      if(!result) {throw HttpErr(404)};
  
      res.status(200).json({
        "message": "contact deleted"
      });
};

async function addContact (req, res) {

      const { _id:owner } = req.user;

      const result = await Contacts.create({...req.body, owner });
      res.status(201).json(result);
};

async function updContact (req, res)  {
      const { contactId } = req.params;  

      const result = await Contacts.findByIdAndUpdate( contactId, req.body, { new: true});
      if(!result) {
          throw HttpErr(404);
      }
  
      res.json(result);
};

async function updateStatusContact (req, res) {

    const { contactId } = req.params;  

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