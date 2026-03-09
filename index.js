const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

bot.on('message', async (msg) => {
  console.log("New message received from:", msg.chat.id); // এই লাইনটি যোগ করুন
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(msg.text);
    bot.sendMessage(msg.chat.id, result.response.text());
    console.log("Reply sent successfully!"); 
  } catch (error) {
    console.error("Gemini Error:", error);
  }
});

console.log("Bot is running...");

// Render-এর পোর্টের সমস্যা সমাধান করতে এই অংশটুকু যোগ করুন
const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Professor Bot is Alive!');
});

app.listen(port, () => {
  console.log(`Health check server listening at http://localhost:${port}`);
  
});

