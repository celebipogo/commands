const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  let wUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(args[0]);

  if (!wUser) return message.channel.send("Please mention a valid user.");

  let warnl = warns[wUser.id].warns;
  
  let warnEmbed = new Discord.MessageEmbed()
	.setTitle("Warnings")
    .addField("User", wUser)
    .addField("Total Warnings", warns[wUser.id].warns)
    .setColor("#7289DA");

  message.channel.send(warnEmbed);
};

module.exports.help = {
  name: "warnings"
};
