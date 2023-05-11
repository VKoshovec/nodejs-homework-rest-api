const sendMsg = require('@sendgrid/mail');
require("dotenv").config(); 

const { SENDGRID_KEY, EMAIL_FROM } = process.env;

sendMsg.setApiKey(SENDGRID_KEY);

const sendLatter = async(data) => {
    const latter = {...data, from: EMAIL_FROM};
    await sendMsg.send(latter);
    return true;
};

module.exports = sendLatter;