const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs').promises;

const contactsPath  = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const currentContacts = await fs.readFile(contactsPath); 
    const list = JSON.parse(currentContacts);
    return list;
  } catch (error) {
    console.log(error);  
  };
}

const getContactById = async(contactId) => {
  try {
    const currentContacts = await listContacts();
    const findElement = currentContacts.find(el=> el.id === contactId);
    console.log(findElement);
    return findElement || null;
} catch (error) {
    console.log(error);  
}
}

const removeContact = async (contactId) => {
try {
    const currentContacts = await listContacts();
    const index = currentContacts.findIndex(item=>item.id===contactId);
    if (index === -1) {
        return null;
    };
    const [result] = currentContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(currentContacts,null,2));
    return result;
} catch (error) {
    console.log(error);
}
}

const addContact = async (body) => {
  try {
    const {  name, email, phone } = body;
    const currentContacts = await listContacts();
    const newContact = { id: nanoid(), name: name, email: email, phone: phone };
    currentContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(currentContacts,null,2)); 
    return newContact;
  } catch (error) {
    console.log(error);  
  };
}

const updateContact = async (id, body) => {
   try {

    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);

    if (index === -1){
        return null;
    };

    const prevBody = contacts[index];

    contacts[index] = { id, ...prevBody, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
    
   } catch (error) {
    console.log(error);
   } 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
