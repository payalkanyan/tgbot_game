import { Bot, InlineKeyboard } from 'grammy';
import { config } from 'dotenv'; 
import { InlineKeyboardButton } from 'grammy/types';
import { userSessions } from './server';

config();
const bot = new Bot(process.env.API_TOKEN as string);

// Start command to ask for the username
bot.command('start', async (ctx) => {
    if (!userSessions[ctx.from?.id!]) {
        return ctx.reply('Welcome! Please enter your username to continue:');
    } else {
        return ctx.reply('You have already entered your username. Use /play to start the game or /leaderboard to view the leaderboard.');
    }
});

// /leaderboard command
bot.command('leaderboard', async (ctx) => {
    if (!userSessions[ctx.from?.id!]) {
        return ctx.reply('Please enter your username first by typing /start');
    }

    const leaderboardButton: InlineKeyboardButton = {
        text: '🏆 View Leaderboard',
        web_app: {
            url: `${process.env.FRONTEND_APP}/leaderboard`,
        }
    };

    const keyboard = new InlineKeyboard().add(leaderboardButton);

    return ctx.reply('Here is the leaderboard!', { reply_markup: keyboard });
});

bot.command('mylevels', async (ctx) => {
    if (!userSessions[ctx.from?.id!]) {
        return ctx.reply('Please enter your username first by typing /start');
    }

    const keyboard = new InlineKeyboard()
        .add({
            text: '🎮 Easy Level', 
            web_app: { url: `${process.env.FRONTEND_APP}/game1` }
        })
        .row()
        .add({
            text: '🔥 Hard Level', 
            web_app: { url: `${process.env.FRONTEND_APP}/game2` }
        });

    await ctx.reply('Choose a level to start playing:', { reply_markup: keyboard });
});

// /play command
bot.command('play', async (ctx) => {
    if (!userSessions[ctx.from?.id!]) {
        return ctx.reply('Please enter your username first by typing /start');
    }

    const leaderboardButton: InlineKeyboardButton = {
        text: 'Play Game',
        web_app: {
            url: `${process.env.FRONTEND_APP}`,
        }
    };

    const keyboard = new InlineKeyboard().add(leaderboardButton);

    return ctx.reply('Get Started!', { reply_markup: keyboard });
});

// /help command
bot.command('help', async (ctx) => {
    if (!userSessions[ctx.from?.id!]) {
        return ctx.reply('Please enter your username first by typing /start');
    }

    const helpMessage = `
    Here are the available commands:
    - /start: Start the bot and provide your username
    - /play: Start playing the Mantler Mind Mining game
    - /leaderboard: View the leaderboard
    - /help: Show this guide
    - /mylevels: Select levels
    `;
    
    return ctx.reply(helpMessage);
});

// Handle the username input and store it in memory
bot.on('message', async (ctx) => {
    if (ctx.message?.text && !userSessions[ctx.from?.id!]) {
        const username = ctx.message.text.trim();
        userSessions[ctx.from?.id!] = username;

        const guideMessage = `
        Thanks for providing your username, ${username}!

        Here are the available commands:
        - /start: Start the bot and provide your username
        - /play: Start playing the Mantler Mind Mining game
        - /leaderboard: View the leaderboard
        - /help: Show this guide
        - /exit: Exit the game or end the session
        `;
        return ctx.reply(guideMessage);
    }
});

// Start the bot
bot.start();
