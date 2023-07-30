const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require('express');
const app = express();
require('dotenv').config();



const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=5ef2f0634ac0822118a0fadf0b8e4a37`
    );
    const data = response.data;
    const weather = data.weather[0].description;
    const temperature = data.main.temp - 273.15;
    const mintemperature = data.main.temp_min - 273.15;
    const maxtemperature = data.main.temp_max - 273.15;

    const city = data.name;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windSpeed = data.wind.speed;
    const message = `${city} : ${weather} 
    Min temperature : ${mintemperature.toFixed(2)}°C 
    Max temperature : ${maxtemperature.toFixed(2)}°C 
    Humidity : ${humidity}% 
    Pressure : ${pressure}hPa
    Wind speed : ${windSpeed}m/s.`;

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, "City doesn't exist.");
  }
});