import { Bot, InlineKeyboard } from "grammy";
import { config } from 'dotenv'; 
import { InlineKeyboardButton } from "grammy/types";
config();

const bot = new Bot(process.env.API_TOKEN as string);

// Start command to send a welcome message and show the "Play Lumberjack" button
bot.command('start', async (ctx) => {
    const username = ctx.from?.id + "";
    const expiration = Date.now() + 600_000; // valid for 10 minutes
    const message = JSON.stringify({
      username,
      expiration,
    });

    // Creating the inline button with webApp URL
    const button: InlineKeyboardButton = {
      text: '🎮 Play Lumberjack!',
      web_app: {
        url: `${process.env.FRONTEND_APP_ORIGIN}`
      }
    };

    // Creating the keyboard
    const keyboard = new InlineKeyboard().add(button);

    return ctx.reply('Pick an app to launch.', { reply_markup: keyboard });
});

// Start the bot
bot.start();
