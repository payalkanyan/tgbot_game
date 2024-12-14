'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from "next/image";

const leaderboardData = [
  { id: 1, username: "Alice", avatar: "/4pp.jpeg" , score: "373"},
  { id: 2, username: "Bob", avatar: "/2pp.webp", score:"365" },
  { id: 3, username: "Charlie", avatar: "/3pp.webp", score:"346" },
];

// Define the type for leaderboard entries
interface LeaderboardEntry {
  username: string;
  score: number;
}

const Leaderboard = () => {
  // Use the defined type for the leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       const res = await fetch('http://localhost:5000/leaderboard');
  //       const data: LeaderboardEntry[] = await res.json();
  //       setLeaderboard(data);
  //     } catch (err) {
  //       console.error('Error fetching leaderboard:', err);
  //     }
  //   };

  //   fetchLeaderboard();
  // }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white p-4"
    >
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-black">
        <h2 className="text-2xl font-bold mb-4">Top Players</h2>
        <ul>
        {leaderboardData.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 border-b last:border-b-0"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-300">
                <Image
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span className="ml-4 text-gray-700 text-lg">{user.username} - </span>
              <span className="ml-4 text-gray-700 text-lg">{user.score}</span>
            </div>
          </li>
        ))}
      </ul>
      </div>
      <p className="m-4 underline decoration-blue-500 decoration-2">
      <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default Leaderboard;
