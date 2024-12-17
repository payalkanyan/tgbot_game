'use client'
import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import Link from 'next/link';
import Score from "./components/Score";
import Image from 'next/image';

const MainPage = () => {
  const [userWallet, setUserWallet] = useState<string | null>(null);

  const registerUser = async (walletAddress: string) => {
    await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: walletAddress }),
    });
  };

  const handleWalletConnect = (walletAddress: string) => {
    setUserWallet(walletAddress);
    registerUser(walletAddress);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative"
      style={{
        background: 'linear-gradient(45deg, #ff0000, #000, #ff0000, #000, #ff0000)',  // Retro gradient background
        fontFamily: "'Press Start 2P', cursive, sans-serif", // Retro Mario-style font
      }}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div> {/* Dark overlay */}

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Techy Mario-style Header with bold text */}
        <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white shadow-2xl">
          Mario the Builder ⛏️
        </h1>

        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          {!userWallet && (
            <WalletConnect onConnect={handleWalletConnect} />
          )}

          {userWallet && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden border-4 border-yellow-500">
                <Image
                  src="/mario-avatar.png" // Replace with Mario-like image
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-yellow-300 shadow-md">
                {userWallet.slice(0, 6)}...{userWallet.slice(-4)}
              </p>
            </div>
          )}

          <Score />

          {/* Play Game Button with bold techy design */}
          <Link href="/game1">
            <p className="w-full p-4 bg-gradient-to-r from-red-500 to-white text-black text-center py-3 rounded-lg shadow-2xl border-b-4 border-r-4 border-white transition-transform transform hover:scale-105 hover:shadow-2xl">
              Play Game
            </p>
          </Link>
          
          {/* Leaderboard and Rewards Links */}
          <Link href="/leaderboard">
            <p className="w-full p-4 bg-gradient-to-r from-red-600 to-white text-black text-center py-3 rounded-lg shadow-2xl border-b-4 border-r-4 border-white transition-transform transform hover:scale-105 hover:shadow-2xl">
              Leaderboard
            </p>
          </Link>
          <Link href="/rewards">
            <p className="w-full p-4 bg-gradient-to-r from-red-700 to-white text-black text-center py-3 rounded-lg shadow-2xl border-b-4 border-r-4 border-white transition-transform transform hover:scale-105 hover:shadow-2xl">
              Your Rewards
            </p>
          </Link>
        </div>
      </div>

      {/* Mario Themed Background Elements with Techy Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[url('/mario-bricks-techy.webp')] bg-repeat-x bg-opacity-70"></div>

      {/* Red and Black Techy Pattern */}
      <div className="absolute inset-0 bg-[url('/techy-pattern.png')] bg-repeat z-0 opacity-50"></div>
    </div>
  );
};

export default MainPage;
