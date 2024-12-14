"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSessions = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.userSessions = {};
exports.userSessions["1"] = "Alice";
exports.userSessions["2"] = "Bob";
exports.userSessions["3"] = "Charlie";
app.get('/api/getuserName/:id', (request, response) => {
    const userId = request.params.id.trim(); // Ensure it's trimmed and a string
    console.log(`Received userId: ${userId}`); // Debugging userId
    const userName = exports.userSessions[userId];
    console.log(`Found username: ${userName}`); // Debugging userName
    if (userName) {
        response.send(`<h1>Hello, ${userName}!</h1>`);
    }
    else {
        response.status(404).send('<h1>User not found</h1>');
    }
});
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
