const { gsrun } = require('./gsRun');
const { google } = require("googleapis");
const keys = require('../data/keys.json');

const googleClient = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
);

exports.gClientAuthorize = (gClient) => {
    console.log('Authorizing...');
    gClient.authorize((err) => {
        if (err) throw (err);
        console.log('Connected!');
    });
};

exports.gClient = googleClient;
