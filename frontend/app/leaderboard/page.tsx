'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from "next/image";

const leaderboardData = [
  { id: 1, username: "Alice", avatar: "/4pp.jpeg", score: "373" },
  { id: 2, username: "Bob", avatar: "/2pp.webp", score: "365" },
  { id: 3, username: "Charlie", avatar: "/3pp.webp", score: "346" },
];

// Define the type for leaderboard entries
interface LeaderboardEntry {
  username: string;
  score: number;
}

const Leaderboard = () => {
  // Use the defined type for the leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        backgroundImage: 'url("/bg2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>

      <div className="w-full max-w-md bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Top Players</h2>
        <ul>
          {leaderboardData.map((user, index) => (
            <li
              key={user.id}
              className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg ${
                index === 0
                  ? "bg-gradient-to-r from-purple-700 to-purple-600  border-2 border-purple-600"
                  : "bg-gradient-to-r from-purple-700 to-purple-600 border-2 border-purple-600"
              }`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={user.avatar}
                    alt={`${user.username}'s avatar`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="ml-4 text-lg font-semibold">{user.username}</span>
                <span className="ml-4 text-lg">{user.score}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="m-4 underline decoration-purple-500 decoration-2">
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default Leaderboard;
