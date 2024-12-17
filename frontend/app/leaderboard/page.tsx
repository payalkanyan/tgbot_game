'use client';
import Link from 'next/link';
// import { useState } from 'react';
import Image from "next/image";

const leaderboardData = [

  { id: 3, username: "xoion", avatar: "/1.jpg", score: "809" },
  { id: 1, username: "Alice", avatar: "/4pp.jpeg", score: "473" },
  { id: 2, username: "Bob", avatar: "/2pp.webp", score: "465" },
];

// Define the type for leaderboard entries
// interface LeaderboardEntry {
//   username: string;
//   score: number;
// }

const Leaderboard = () => {
  // Use the defined type for the leaderboard state
  // const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        background: 'linear-gradient(45deg, #ff0000, #000, #ff0000, #000, #ff0000)',  // Retro gradient background
        fontFamily: "'Press Start 2P', cursive, sans-serif", // Retro Mario-style font
      }}
    >
      <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
        Leaderboard 🏆
      </h1>

      <div className="w-full max-w-md rounded-lg shadow-lg p-6 bg-black bg-opacity-70">
        <h2 className="text-xl font-bold mb-4 text-center text-yellow-300">Top Players</h2>
        <ul>
          {leaderboardData.map((user, index) => (
            <li
              key={user.id}
              className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-md ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-500 to-red-500 border-2 border-red-500"
                  : "bg-gradient-to-r from-yellow-500 to-red-500 border-2 border-red-500"
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
                <span className="ml-4 text-lg font-semibold text-white">{user.username} - </span>
                <span className="ml-4 text-lg text-white">{user.score}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="m-4 underline decoration-yellow-500 decoration-2">
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default Leaderboard;
