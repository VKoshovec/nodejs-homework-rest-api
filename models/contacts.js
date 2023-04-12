const { Schema, model, Types } = require('mongoose');

const contactsSchema = new Schema({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
}, { versionKey: false, timestamps: true });

contactsSchema.post("save", (error, data, next)=> {
  error.status = 400;
  next();
});

const checkId = (contactId, errAction) => {
  if( !Types.ObjectId.isValid( contactId ) ) throw errAction ;
}

const Contacts = model("contacts", contactsSchema);

module.exports = {
    Contacts,
    checkId
};