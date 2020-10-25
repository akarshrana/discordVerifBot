const emojiBound = require('./data/emojiBound.json');
const roleBound = require('./data/roleID.json');


exports.handleReaction = async (reaction, user, add) => {
	if (user.id === '740299527080247359')
		return;
	console.log(reaction);
	let emoji = reaction._emoji.name;
	console.log(emoji);
	let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
	try {
		if (add) member.roles.add(roleBound[emojiBound[emoji]]);
		else member.roles.remove(roleBound[emojiBound[emoji]]);
	}
	catch (err) {
		console.log(err);
	}
}