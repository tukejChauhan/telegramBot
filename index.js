const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (message) => {
    // console.log(message);
    let chatId = message.from.id;

    bot.sendMessage(chatId, "Hello for WeatherBot!");
})