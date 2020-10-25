const { gsrun } = require('../google/gsRun');
const messages = require('../data/messages.json');

exports.refresh = async (gClient, message) => {
    console.log('Refresh Command...');
    message.reply(messages.refresh);
    return await gsrun(gClient);
};

exports.verifyMember = async (message, data, args) => {
    await message.member.send(messages.yohooman);
    let rollNumber = args[0];
    let secretKey = args[1];

    console.log(secretKey, rollNumber);

    var found = false;
    for (i = 0; i < data.data.values.length; i++) {
        if (data.data.values[i][3] == rollNumber) {
            found = true; break;
        }
    }
    if (!found) {
        message.member.send(messages.verifFail);
    }
    else {
        if (data.data.values[i][4] == secretKey) {
            let yy = rollNumber[0] + rollNumber[1];
            let bb = rollNumber[2] + rollNumber[3];
            if (rollNumber[5] == 1 || rollNumber[5] == 2) {
                message.member.roles.add(roleIDs[yy]);
                message.member.roles.add(roleIDs[bb]);
                message.member.roles.add(roleIDs[yy + bb]);
            }
            else if (rollNumber[5] == 5) {
                message.member.roles.add(roleIDs["msc" + yy]);
                message.member.roles.add(roleIDs[bb]);
            }
            else if (rollNumber[5] == 6) {
                message.member.roles.add(roleIDs["mt" + yy]);
                // message.member.roles.add(roleIDs[bb]);
            }
            message.member.roles.add(roleIDs.member);
            await message.member.setNickname(data.data.values[i][2]);
            message.member.send('Verification succesfull! Welcome to the gang!');
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

exports.sendMessage = (client, message) => {
    try {
        let channel_id = "";
        let i = 0;
        while (message.content[i] != " ") ++i;
        ++i;
        while (message.content[i] != " ") {
            channel_id += message.content[i];
            ++i;
        };
        ++i;
        let new_content = message.content.slice(i, message.content.length);
        const channel = client.channels.cache.get(channel_id);
        channel.send(new_content);
        message.member.send("Sent:\n" + new_content);
    }
    catch (err) {
        console.log(err);
        message.member.send("Failed!");
    }
};


// 5 for M.SC
// 6 For M.Tech

// XX Means, Branch name
// Details: -
// 1) FOR ENGINEERING
// ✓ CL....Climate science and technology
// ✓ CS....Computer Science and Engineering
// ✓ EC....Electronic and Communication Engineering
// ✓ EV.....Environmental Engineering
// ✓ GT....Geotechnical Engineering
// ✓ MF....Manufacturer Engineering
// ✓ SD....Mechanical System Design
// ✓ MM..Metallurgical and Materials Engineering
// ✓ PD....Power Electronics and Drives
// ✓ PS....Power Systems Engineering
// ✓ SE....Structural Engineering
// ✓ TS...Thermal Science and Engineering
// ✓ TE...Transportation Engineering
// ✓ WR...Water Resources Engineering

// 2) MSC
// ✓ CL....Atmospheric and Ocean Sciences
// ✓ CY....Chemistry
// ✓ GG...Geology
// ✓ MA...Mathematics
// ✓ PH....Physics