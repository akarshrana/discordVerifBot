if (RoleActive) {
    const iitGuild = client.guilds.cache.get(roleIDs.guildID);
    iitGuild.members.fetch().then(
        function (mmbrs) {
            for (x of mmbrs) {
                mmbrsG.push(x[1]);
            }
            jjj = 0;
            succ = 0;
            fail = 0;
        });
    itvl = setInterval(() => {
        mmbrsG[jjj].send("Please ignore messages received before this, if any.");
        let b = true;
        if (!mmbrsG[jjj].nickname) {
            console.log("null found");
            b = false;
        }
        console.log("Searching: ", mmbrsG[jjj].nickname);
        if (b) {
            for (i = 0; i < data.data.values.length && b; i++) {
                let rollThis = data.data.values[i][3];
                let year = parseInt("" + rollThis[0] + rollThis[1]);
                let branch = "" + rollThis[2] + rollThis[3];
                let nickName = data.data.values[i][2];
                if (nickName == mmbrsG[jjj].nickname) {
                    try {
                        mmbrsG[jjj].roles.add(roleIDs[year]);
                        mmbrsG[jjj].roles.add(roleIDs[branch]);
                        b = false;
                        console.log("Found");
                        mmbrsG[jjj].send(messages.roleAssigned);
                        succ++;
                        break;
                    }
                    catch (err) {
                        console.log(err);
                        b = true;
                        break;
                    }
                }
            }
        }
        else b = true;
        if (b == true) {
            mmbrsG[jjj].send(messages.addRoleSuccess);
            console.log("Not Found");
            fail++;
        }
        jjj++;
        if (jjj == mmbrsG.length) clearInterval(itvl);
        console.log("Success: ", succ, "   Failed: ", fail, "   jjj: ", jjj);
    }, 1000);
}