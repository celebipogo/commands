const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You are not allowed to run this command.");

  let wUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(args[0]);

  if (!wUser) return message.channel.send("Please mention a valid user.");

  if (wUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Unable to warn staff members.");

  let reason = args.join(" ").slice(22);
  if (!reason) reason = "No reason provided.";

  if (!warns[wUser.id])
    warns[wUser.id] = {
      warns: 0
    };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.MessageEmbed()
	.setTitle("Warning Logged")
    .addField("User Warned", wUser)
    .addField("Reason", reason)
    .addField("Current Warnings", warns[wUser.id].warns)
    .setColor("#7289DA");

  message.channel.send(warnEmbed);
};

module.exports.help = {
  name: "warn"
};
