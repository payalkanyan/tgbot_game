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
(0, dotenv_1.config)();
const bot = new grammy_1.Bot(process.env.API_TOKEN);
// Start command to send a welcome message and show the "Play Lumberjack" button
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const username = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) + "";
    const expiration = Date.now() + 600000; // valid for 10 minutes
    const message = JSON.stringify({
        username,
        expiration,
    });
    // Creating the inline button with webApp URL
    const button = {
        text: '🎮 Play Lumberjack!',
        web_app: {
            url: `${process.env.FRONTEND_APP_ORIGIN}`
        }
    };
    // Creating the keyboard
    const keyboard = new grammy_1.InlineKeyboard().add(button);
    return ctx.reply('Pick an app to launch.', { reply_markup: keyboard });
}));
// Start the bot
bot.start();
