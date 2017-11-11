const urlPrefix = 'https://www.smava.de/kreditanfrage/kreditantrag.html';
const googleUrlShortener = 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDeD9bJX5VJM6P5N3BDJy2n7udFRYweSrk';

const constructUrl = function (route, success, amount, initialPayment = 0, duration = 84) {
  const url = `${urlPrefix}?route=${route}&clear&success=${success}&amount=
                ${amount}&initialPayment=${initialPayment}&duration=${duration}`;
   return url;
}

const getShortenedUrl = function (url) {

    const data = '{"longUrl" : url}';
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", googleUrlShortener, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response;
  // data = { "longUrl" : url }
  //   data_json = json.dumps(data)
  //
  //   headers = { "Content-type": "application/json" }
  //   response = requests.post(googleUrlShortener, data=data_json, headers=headers)
  //   body = response.json()
  //
  //   return body["id"]
}

var request = require('request');

var headers = {
   'Content-Type': 'application/json'
};

var dataString = '{ "longUrl" : "https://www.smava.de/kreditanfrage/kreditantrag.html?route=V1&clear&success=undefined&amount=10000&initialPayment=0&duration=84"}';

var options = {
   url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDeD9bJX5VJM6P5N3BDJy2n7udFRYweSrk',
   method: 'POST',
   headers: headers,
   body: dataString
};

function callback(error, response, body) {
   if (!error && response.statusCode == 200) {
       console.log(response.statusCode);
   }else{
       console.log("xxx"+error);
   }
}


request(options, callback);
