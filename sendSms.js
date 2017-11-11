'use strict';

const twilio = require('twilio');

const accountSid = 'ACb0111ad777bca56d072ba9f5d0841019';
const authToken = '7dad5af98b3452f299c51070b02d9e01';

const client = new twilio(accountSid, authToken);

const senderNumber = '+17869712513';

const sendSms = (recipient, message) =>
  client.messages.create({
    body: message,
    to: recipient,
    from: senderNumber
  });

module.exports = sendSms;