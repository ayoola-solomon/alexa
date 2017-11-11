'use strict';

const request = require('request-promise');
const sendSms = require('./sendSms.js');

const urlPrefix = 'https://www.smava.de/kreditanfrage/kreditantrag.html';
const googleUrlShortener = 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDeD9bJX5VJM6P5N3BDJy2n7udFRYweSrk';

const constructUrl = (amount, initialPayment = 0, duration = 84)  =>
  `${urlPrefix}?route=v1&clear&success=undefined&amount=${amount}&initialPayment=${initialPayment}&duration=${duration}`;

const getShortenedUrl = (data) => {
  console.log(data);
  const longUrl = constructUrl(data.amount);
  const body = { longUrl };

  const options = {
    method: 'POST',
    uri: googleUrlShortener,
    body,
    json: true,
  };

  request(options)
  .then(response => {

    const url = response.id;
    const message = `Testing this out :) with link ${url}`;
    const recipient = data.phone;

    return sendSms(recipient, message);
  })
  .then(message => {
    console.log('Sms successfully sent :)');
    console.log(message);
  })
  .catch(err => {
    console.error(err);
  });
}

module.exports = getShortenedUrl(data);