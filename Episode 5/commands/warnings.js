const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8")); //We use this so that it knows what the database is. We'll be using a JSON database.

module.exports.run = async (bot, message, args) => {
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]); //This enables us to know what member we want to see the warns for.
  if (!wUser) return message.channel.send("Please mention a valid member in this server."); //This will make sure we mention a user.

  let warn1 = warns[wUser.id].warns; //This is just a shortcut to get the number of warns.

  let warnembed = new Discord.MessageEmbed() //This is our embed.
    .setTitle("Warnings")
    .addField("User", wUser)
    .addField("Total Warnings", warns[wUser.id].warns)
    .setColor("#7289DA");
  
  message.channel.send(warnembed); //This sends our embed.
};

module.exports.help = {
  name: "warnings"
};
