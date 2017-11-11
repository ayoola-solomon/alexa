'use strict';

const Alexa = require('alexa-sdk');

const WELCOME_MESSAGE = "Willkommen beim Kreditvergleich von smava - Deutschlands günstigstem Online-Kredit... Wie viel Geld möchtest du?";

const handlers = {
    'LaunchRequest': function () {
      this.response.speak(WELCOME_MESSAGE).listen();
      this.emit(':responseReady');
    },
    'getLoanAmount': function () {
      const amountSlot = this.event.request.intent.slots.amount.value;

      this.attributes['amount'] = amountSlot;
      if (amountSlot) {
        this.response.speak(`Gut, ${amountSlot} EURO... Und wie hoch darf die Monatsrate maximal sein?`).listen();
      } else {
        this.response.speak('Bitte wiederhole das noch einmal.').listen();
      }
      this.emit(':responseReady');
    },
    'getMonthlyRate': function () {
        const rateSlot = this.event.request.intent.slots.rate.value;

        this.attributes['monthlyRate'] = rateSlot;

        const regex = /\d/;
        if (regex.test(rateSlot)) {
          const amount = this.attributes['amount'];
          this.response.speak(`Gute Nachrichten! Ich habe über 20 Kreditangebote gefunden für ${amount} EURO mit einer maximalen Monatsrate von ${rateSlot} EURO...
            Super! Wir sind fast fertig! Ich benötige jetzt noch dein Geburtsdatum.`).listen();
        } else {
          this.response.speak('Bitte wiederhole das noch einmal.').listen();
        }
        this.emit(':responseReady');
    },
    'getBirthdate': function () {
      const birthDate = this.event.request.intent.slots.birthDate.value;

      this.attributes['birthDate'] = birthDate;

      if (birthDate) {
        this.response.speak('Alles klar. Ich schicke dir jetzt einen Link mit deinen Angeboten auf dein Handy. Gib mir dafür bitte deine Handynummer.').listen();
      } else {
        this.response.speak('Können Sie bitte eine Frage stellen wie: Ich möchte einen Kredit von');
      }
      // console.log(birthDate);
      // const date = new Date(birthDate);
      //
      // console.log(date);
      //
      //
      // const yearOfBirth = parseInt(date.getFullYear(), 10);
      // const yearDiff = 2017 - yearOfBirth;
      //
      // if (yearDiff < 18) {
        // this.response.speak('Oh, du musst leider volljährig sein, um einen Kredit aufnehmen zu können.');
      // } else {
      // }
      // if (rateSlot) {
      //   const amount = this.attributes['amount'];
      //   this.response.speak(`Gute Nachrichten! ich habe über 20 Angebote bei smava gefunden für ${amount} EURO mit einer monatlichen Rate von ${rateSlot}`).listen();
      // } else {
      //   this.response.speak('Können Sie bitte eine Frage stellen wie: Ich möchte einen Kredit von');
      // }
      this.emit(':responseReady');
    },
    'getPhoneNumber': function () {
      const phone = this.event.request.intent.slots.phone.value;
      this.attributes['phone'] = phone;

      this.resposne.speak('OK, ich habe dir soeben den Link mit deinen passenden Kreditangeboten auf dein Handy geschickt. Klicke dort auf den Button “Weiter”!');
      this.emit(':responseReady');
    },
    'kreditData': function () {
        const amountSlot = this.event.request.intent.slots.amount.value;
        if (amountSlot) {
            this.response.speak('You want to get kredit for ' + amountSlot + ' EUROS right?').listen('Thank you');
        } else {
            this.response.speak('Can you please ask a question like,I want kredit with amount?').listen('Can you come again please.');
        }
        this.emit(':responseReady');
    },
    'phoneNumber': function () {
        const phone = this.event.request.intent.slots.phone.value;
        this.response.speak('Your Phone number is ' + phone);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {},
    'AMAZON.RepeatIntent': function () {},
    'AMAZON.StopIntent': function () {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
