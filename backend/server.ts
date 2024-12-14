import express from 'express';

const app = express();

export const userSessions: { [userId: string]: string } = {};

userSessions["1"] = "Alice";
userSessions["2"] = "Bob";
userSessions["3"] = "Charlie";

app.get('/api/getuserName/:id', (request, response) => {
    const userId = request.params.id.trim(); // Ensure it's trimmed and a string

    console.log(`Received userId: ${userId}`); // Debugging userId

    const userName = userSessions[userId];
    console.log(`Found username: ${userName}`); // Debugging userName

    if (userName) {
        response.send(`<h1>Hello, ${userName}!</h1>`);
    } else {
        response.status(404).send('<h1>User not found</h1>');
    }
});

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
