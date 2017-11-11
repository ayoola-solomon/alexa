import json
import requests

urlPrefix = 'https://www.smava.de/kreditanfrage/kreditantrag.html'
googleUrlShortener = 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDeD9bJX5VJM6P5N3BDJy2n7udFRYweSrk'


def constructUrl(route, success, amount, initialPayment, duration):
   url = urlPrefix + "?route=" + route + "&clear" + "&success="
            + success + "&amount=" + str(amount) + "&initialPayment="
            + str(initialPayment) + "&duration=" + str(duration)
   return url

def getShortenedUrl(url):
    data = { "longUrl" : url }
    data_json = json.dumps(data)

    headers = { "Content-type": "application/json" }
    response = requests.post(googleUrlShortener, data=data_json, headers=headers)
    body = response.json()

    return body["id"]
