const { gsrun } = require('./gsRun');
const { google } = require('googleapis');

// const keys = require('../data/keys.json');
const keysEnvVar = process.env.CREDS;
const keys = JSON.parse(keysEnvVar); // https://stackoverflow.com/questions/57334178/how-to-use-env-to-store-a-json-key-for-use-with-jwt
// const googleClient = new google.auth.JWT(
//     process.env.CLIENT_EMAIL,
//     null,
//     process.env.PRIVATE_KEY,
//     ["https://www.googleapis.com/auth/spreadsheets"]
// );
// console.log(keys);
const googleClient = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

exports.gClientAuthorize = (gClient) => {
  console.log('Authorizing...');
  //   console.log(k);
  // console.log(process.env.CLIENT_EMAIL, process.env.PRIVATE_KEY);
  gClient.authorize((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
};

exports.gClient = googleClient;
