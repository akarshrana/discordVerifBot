const { gsrun } = require('./gsRun');
const { google } = require("googleapis");
// const { config } = require("dotenv");
// config({ path: __dirname + "/.env" });
const keys = require("../data/keys.json");

// const googleClient = new google.auth.JWT(
//     process.env.CLIENT_EMAIL,
//     null,
//     process.env.PRIVATE_KEY,
//     ["https://www.googleapis.com/auth/spreadsheets"]
// );

const googleClient = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
);

exports.gClientAuthorize = (gClient) => {
    console.log('Authorizing...');
    console.log(keys.client_email, keys.private_key);
    // console.log(process.env.CLIENT_EMAIL, process.env.PRIVATE_KEY);
    gClient.authorize((err) => {
        if (err) throw (err);
        console.log('Connected!');
    });
};

exports.gClient = googleClient;
