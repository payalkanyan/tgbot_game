// pages/api/getUsername.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Assuming the bot server is running locally on port 4000, adjust the URL as needed
const BOT_SERVER_URL = 'http://localhost:3005/api/getuserName';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // Get the userId from the query

  
    // Fetch the username from the bot server API
    const response = await fetch(`${BOT_SERVER_URL}/${userId}`);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(404).json(data); // Handle user not found
    }
  
}
