const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const YTDL = require("ytdl-core");
const PREFIX = "DataCommand-";
const opusscript = require("opusscript");
const FFMPEG = require('fluent-ffmpeg');
const axios = require('axios');
const secret = `${process.env.Secret_Key}`
const pass = `${process.env.Command_Authorization_Code}`
console.log(`secret-key: ${secret}`)
let musicplaying = false;
var servers = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setGame("Galactic Conquest", "https://www.roblox.com/games");
  let gamedata = {
    "game.name":"Galatic Conquest"
  };
  client.user.setPresence(gamedata);
  client.generateInvite(["ADMINISTRATOR"])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return msg.channel.sendMessage("Private bot usage is restricted.");
  //console.log(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  /*let channel = msg.channel.guild.channels.find(`name`, `messagelogs`);
  let embed = new Discord.RichEmbed();
  embed.setTitle("Message sent.");
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  embed.setColor("#A52A2A");
  embed.setDescription(`${msg.author.username} sent a message.`);
  embed.addField("Location:", `${msg.channel}`);
  embed.addField('Content:', `${msg.content}`);
  channel.sendMessage({embed});*/
  let embed = new Discord.RichEmbed();
  embed.setTitle("Attempted database access.");
  embed.setThumbnail(client.user.displayAvatarURL);
  embed.setColor("0000FF");
  embed.setDescription(`${msg.author} attempted to access the database.`)
  embed.setTimestamp(new Date())
  embed.setAuthor(msg.author)
  if (!msg.content.startsWith(PREFIX)) return;
  var args = msg.content.substring(PREFIX.length).split(" ");
  switch (args[0].toLowerCase()) {
    case "requestdata":
      embed.addField('Command', 'RequestDATA');
      if (!args[1]) {
        msg.reply('please enter the authorization code to use this command.');
       embed.addField('Result:', 'Access Denied');
        embed.addField('Error:', 'nil_auth');
        client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
        return;
      }
      if (args[1] !== pass) {
        msg.reply('invalid command authorization code.');
        embed.addField('Result:', 'Access Denied');
        embed.addField('Error:', 'bad_auth');
        client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
        return;
      }
      if (!args[2]) {
        msg.reply('please specify the bin you would like to retrieve.')
       embed.addField('Result:', 'Access Denied');
        embed.addField('Error:', 'no_bin_');
        client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
        return;
      }
      let requesturl = `https://api.jsonbin.io/b/${args[2]}`
      console.log(`RequestDATA command made to ${requesturl}`)
      axios.request({
        url: requesturl,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'secret-key': secret
        }
      }).then(function (response) {
    msg.reply(`${response.data}`);
  }).catch(function (error) {
    console.log(error);
  });
      embed.addField('Result:', 'Access Granted');
      client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
      break;
    /*case "test":
      msg.reply('this is a response to a test prompt message.');
      break;*/
                   
    case "deletedata":
      
    break;
    case "createdata":
      embed.addField('Command', 'CreateDATA');
      if (!args[1]) {
        msg.reply('please enter the authorization code to use this command.');
       embed.addField('Result:', 'Access Denied');
        embed.addField('Error:', 'nil_auth');
        client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
        return;
      }
      if (args[1] !== pass) {
        msg.reply('invalid command authorization code.');
        embed.addField('Result:', 'Access Denied');
        embed.addField('Error:', 'bad_auth');
        client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
        return;
      }
      if (!args[2]) {
        msg.reply('please specify the bin you would like to retrieve.')
       embed.addField('Result:', 'Access Denied');
        embed.addField('Error:', 'no_bin_');
        client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
        return;
      }
      axios.request({
        url: 'https://api.jsonbin.io/b',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'secret-key': `${secret}`,
          'collection-id': (args[2])
        },
        data: {
          testValue: 21
        }
      });
      embed.addField('Result:', 'Access Granted');
      client.guilds.find(`name`, `Kyber Games Community (Official)`).channels.find(`name`, `database_action_logs`).sendMessage({embed})
      break;
    case "announcement":
      
      break;
    case "editdata":
      
      break;
    default:
      msg.reply("the command you called for doesn't exist.");
      break;
  }
});
client.login(process.env.BOT_TOKEN);
