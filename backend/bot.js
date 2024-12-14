"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const dotenv_1 = require("dotenv");
const server_1 = require("./server");
(0, dotenv_1.config)();
const bot = new grammy_1.Bot(process.env.API_TOKEN);
// Start command to ask for the username
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!server_1.userSessions[(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id]) {
        return ctx.reply('Welcome! Please enter your username to continue:');
    }
    else {
        return ctx.reply('You have already entered your username. Use /play to start the game or /leaderboard to view the leaderboard.');
    }
}));
// /leaderboard command
bot.command('leaderboard', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!server_1.userSessions[(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id]) {
        return ctx.reply('Please enter your username first by typing /start');
    }
    const leaderboardButton = {
        text: '🏆 View Leaderboard',
        web_app: {
            url: `${process.env.FRONTEND_APP}/leaderboard`,
        }
    };
    const keyboard = new grammy_1.InlineKeyboard().add(leaderboardButton);
    return ctx.reply('Here is the leaderboard!', { reply_markup: keyboard });
}));
bot.command('mylevels', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!server_1.userSessions[(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id]) {
        return ctx.reply('Please enter your username first by typing /start');
    }
    const keyboard = new grammy_1.InlineKeyboard()
        .add({
        text: '🎮 Easy Level',
        web_app: { url: `${process.env.FRONTEND_APP}/game1` }
    })
        .row()
        .add({
        text: '🔥 Hard Level',
        web_app: { url: `${process.env.FRONTEND_APP}/game2` }
    });
    yield ctx.reply('Choose a level to start playing:', { reply_markup: keyboard });
}));
// /play command
bot.command('play', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!server_1.userSessions[(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id]) {
        return ctx.reply('Please enter your username first by typing /start');
    }
    const leaderboardButton = {
        text: 'Play Game',
        web_app: {
            url: `${process.env.FRONTEND_APP}`,
        }
    };
    const keyboard = new grammy_1.InlineKeyboard().add(leaderboardButton);
    return ctx.reply('Get Started!', { reply_markup: keyboard });
}));
// /help command
bot.command('help', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!server_1.userSessions[(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id]) {
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
}));
// Handle the username input and store it in memory
bot.on('message', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text) && !server_1.userSessions[(_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id]) {
        const username = ctx.message.text.trim();
        server_1.userSessions[(_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id] = username;
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
}));
// Start the bot
bot.start();
