// components/DisplayUsername.tsx
import { useEffect, useState } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import Image from 'next/image';

// Assuming the bot server is running locally on port 4000, adjust the URL as needed
const BOT_SERVER_URL = 'http://localhost:3005/api/getuserName';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // Get the userId from the query

  try {
    // Fetch the username from the bot server API
    const response = await fetch(`${BOT_SERVER_URL}/${userId}`);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(404).json(data); // Handle user not found
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch username' });
  }
}

const DisplayUsername = ({ userId }: { userId: string }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the username from the Next.js API route
    fetch(`/api/getuserName/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.username) {
          setUsername(data.username);
        } else {
          setUsername('Username not found');
        }
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  }, [userId]);

  return (
    <div className="flex items-center">
  <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-300">
    <Image
      src="/5pp.png"
      alt="avatar"
      layout="fill"
      objectFit="cover"
    />
  </div>
  <div className="ml-4">
    {username ? <h1>{username}!</h1> : <p>xoion</p>}
  </div>
</div>
  );
};

export default DisplayUsername;
