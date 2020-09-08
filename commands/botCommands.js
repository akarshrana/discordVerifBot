const { gsrun } = require('../google/gsRun');
const messages = require('../data/messages.json');

exports.refresh = async (gClient, message) => {
    console.log('Refresh Command...');
    message.reply(messages.refresh);
    return await gsrun(gClient);
};
exports.verifyMember = async (message, data, args) => {
    await message.member.send(messages.yohooman);
    const rollNumber = args[0];
    const secretKey = args[1];

    console.log(secretKey, rollNumber);

    var found = false;
    for (i = 0; i < data.data.values.length; i++) {
        if (data.data.values[i][3] == rollNumber) { found = true; break; }
    }
    if (!found) {
        message.member.send(messages.verifFail);
    }
    else {
        if (data.data.values[i][4] == secretKey) {
            message.member.roles.add(roleIDs.member);
            await message.member.setNickname(data.data.values[i][2]);
            message.member.send(messages.verifSuccess);
            message.member.roles.remove(roleIDs.res_member);
        }
        else message.member.send(messages.keyMismatch);
    }
    message.delete({ timeout: 500 })
        .then(message => console.log(`Deleted message from ${message.author.username} after 0.5 seconds`))
        .catch(err => console.error(err));
};

exports.assignRole = (message, args) => {
    let roleG = args[0];
    let year = parseInt("" + roleG[0] + roleG[1]);
    let branch = "" + roleG[2] + roleG[3];
    try {
        message.member.roles.add(roleIDs[year]);
        message.member.roles.add(roleIDs[branch]);
        message.member.send("You've been assigned new roles.");
    }
    catch (err) {
        console.log(err);
        message.member.send("Failed! Please check the syntax.");
    }
};

exports.ee18 = (message) => {
    try {
        message.member.roles.add(roleIDs["18EE"]);
        message.member.send("You can now see the emft chat.");
    }
    catch (err) {
        console.log(err);
        message.member.send("Failed! Please check the syntax.");
    }
};