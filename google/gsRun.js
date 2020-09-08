const { google } = require("googleapis");

exports.gsrun = async (cl) => {
    console.log('Fetching latest data...');
    var gsapi = google.sheets({ version: 'v4', auth: cl });
    var opt = {
        spreadsheetId: '11Yq9Hk6CCvyw7wGDV8hbMGkiBXdUfPK6Gcx-syQ-A3o',
        range: 'response'
    };
    return data = await gsapi.spreadsheets.values.get(opt);
    // console.log(data.data.values.length);
};