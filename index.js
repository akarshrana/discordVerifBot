const { Client } = require("discord.js");
const { gClient, gClientAuthorize } = require('./google/gClient');
const { gsrun } = require('./google/gsRun');

const { config } = require("dotenv");
config({ path: __dirname + "/.env" });

const botCommands = require('./commands/botCommands');

let data;

// Google Authorize + Load Data
gClientAuthorize(gClient);
(async () => {
	data = await gsrun(gClient);
})();

// Discord Client
const client = new Client({
	disableEveryone: true
});

// Discord Connect
client.on("ready", () => {
	console.log(`${client.user.username} ONLINE!`);
	client.user.setActivity('Fight Club', { type: "WATCHING" });
});

// Discord Bot Listen
client.on("message", async message => {
	if (!message.content.startsWith('!')) return;

	const fullMessage = message.content.slice(1);
	const args = fullMessage.split(' ');
	const command = args.shift();

	console.log(`${command} from ${message.author.username}`);

	if (command === 'refresh') botCommands.refresh(gClient, message).then(newData => { data = newData; });
	else if (command === 'verif') botCommands.verifyMember(message, data, args);
	else if (command === 'addRole') message.member.reply('Nothing here check back later');
	else if (command === "assign") botCommands.assignRole(message, args);
	else if (command === "18EE") botCommands.ee18(message);
	else {
		message.member.send("Invalid command, please check the syntax and try again.");
	}
});

// Discord Client Login
client.login(process.env.TOKEN);