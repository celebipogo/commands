const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You are not allowed to run this command.");

  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.channel.send(
      "Please specify how many messages you would like to purge. (min 2, max 100)"
    );
  message.channel
    .bulkDelete(deleteCount)
    .catch(error =>
      message.channel.send(`Couldn't purge messages because of: ${error}.`)
    );
};

module.exports.help = {
  name: "purge"
};
