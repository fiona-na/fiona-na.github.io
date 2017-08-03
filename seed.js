const fetch = require('fetch').fetchUrl;
const faker = require('faker');

const API = 'https://morning-reaches-22096.herokuapp.com/events';
const input = parseInt(process.argv[2]);
const num = !Number.isInteger(input) ? 1 : input;

const types = [
  'Entertainment',
  'Lunch & Learn',
  'Meetup',
  'Party',
  'Other'
];

let event

for (let i = 0; i < num; i++) {
  event = {
    title: faker.lorem.word(),
    type: types[Math.floor((Math.random() * 5))],
    data: faker.lorem.paragraph(),
    serviceid: faker.lorem.word(),
    timestamp: Date.now(),
    icon: faker.image.avatar()
  };
  fetch(API,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      payload: JSON.stringify(event)
    }, (err, meta, body) => {
      console.log(`event #${i + 1} posted`);
    }
  );
}

